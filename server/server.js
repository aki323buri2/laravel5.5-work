import fs from 'fs-extra';
import path from 'path';
import cs from 'child_process';
import filesize from 'filesize';
import _ from 'lodash';
import logger from './logger';
import excel from './excel';
process.chdir(__dirname);
let dirname, basename, filename;
dirname = './files';
basename = '在庫(分類別_支社別_商品部)平成29年2月28日テーブル.xlsx';
basename = '統計用分類（20170220現在）.xlsx';
basename = '売上粗利（分類別_支社別）平成29年1月単月・累計_前期比較テーブル.xlsx';
basename = '売上粗利（分類別_支社別）平成29年1月単月・累計テーブル.csv';
basename = '売上粗利（分類別_支社別）平成29年1月単月・累計テーブル.xlsx';
basename = 'Book1.xlsx';
filename = path.join(dirname, basename);
(async a => a)().then(async a =>
{
	logger.info(_('#').repeat(50));
	logger.info(filename);
	const book = await excel(filename);
	book.parseSheet(book.sheets[0].name);
});
