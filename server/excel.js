import stream from 'stream';
import fs from 'fs-extra';
import unzip2 from 'unzip2';
import sax from 'sax';
import path from 'path';
import _ from 'lodash';
export default filename => Excel.createBook(filename);
export class Excel extends stream.Readable
{
	static createBook = filename => new Promise(resolve =>
	{
		const excel = new Excel(filename);
		excel.on('book', () => resolve(excel));
	});
	constructor(filename, props)
	{
		super(props);
		this.sst = [];
		this.sheets = [];
		this.rels = [];
		this.filename = filename;
		fs.createReadStream(filename).pipe(unzip2.Parse())
		.on('entry', async entry =>
		{
			switch (entry.path)
			{
				case 'xl/workbook.xml': 
					this.sheets = await loadList(entry, 'workbook/sheets/sheet', node =>
					{
						const { name, sheetId, 'r:id': rId } = node.attributes;
						return { name, sheetId, rId };
					});
					break;
				case 'xl/_rels/workbook.xml.rels': 
					this.rels = await loadMap(entry, 'Relationships/Relationship', node =>
					{
						const { Id, Target } = node.attributes;
						return { [Id]: Target };
					});
					break;
				case 'xl/sharedStrings.xml': 
					this.sst = await loadList(entry, 'sst/si/t', node =>
					{
						return node.text;
					});
					break;
			}
			entry.autodrain();
		})
		.on('close', () =>
		{
			_(this.sheets).each(sheet =>
			{
				sheet.rel = path.join('xl', this.rels[sheet.rId]);
			});
			this.emit('book');
		});
	}
	parseSheet = name =>
	{
		const path = _(this.sheets).find(sheet => sheet.name === name).rel;
		fs.createReadStream(this.filename).pipe(unzip2.Parse())
		.on('entry', entry =>
		{
			if (entry.path === path) 
			{
				parseXml(entry)
				.on('node', node =>
				{
					console.log(node);
				})
				.on('end', () =>
				{
					console.log('...');
				});
			}
			entry.autodrain();
		})
		.on('close', () =>
		{
			console.log('!');
		});
	}
}
class SheetStream extends stream.Writable
{
	constructor(opts)
	{
		super(opts);
	}
}
const loadList = (entry, path, callback) => new Promise(resolve =>
{
	const list = [];
	parseXml(entry).on('node', node =>
	{
		if (node.path === path) list.push(callback(node));
	})
	.on('end', () => 
	{
		resolve(list);
	});
});
const loadMap = (entry, path, callback) => new Promise(resolve =>
{
	const map = {};
	parseXml(entry).on('node', node =>
	{
		if (node.path === path) _.assign(map, callback(node));
	})
	.on('end', () =>
	{
		resolve(map);
	});
});
const parseXml = entry => new ParseXml(entry);
class ParseXml extends stream.Readable
{
	constructor(entry, opts)
	{
		super(opts);
		const strict = true;
		const trim = false;
		const position = true;
		const strictEntities = true;
		entry.pipe(sax.createStream(strict, { trim, position, strictEntities }))
		.on('opentag' , this.opentag)
		.on('text'    , this.text)
		.on('closetag', this.closetag)
		.on('end'     , this.end)
		;
		this.nodes = [];
		this.paths = [];
	}
	opentag = node =>
	{
		this.nodes.push(node);
		this.paths.push(node.name);
	}
	text = text =>
	{
		if (this.nodes.length === 0) return;
		_(this.nodes).last().text = text;
	}
	closetag = name =>
	{
		const node = _(this.nodes).last();
		node.path = this.paths.join('/');
		this.emit('node', node);
		this.nodes.pop();
		this.paths.pop();
	}
	end = () =>
	{
		this.emit('end');
	}
}