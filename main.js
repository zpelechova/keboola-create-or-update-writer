import Apify from 'apify';
import fs from 'fs';
import { config } from 'dotenv';
import * as lib from './lib.js';
config();
 
const shopName = 'aaaatest';
 
Apify.main(async () => {
    console.log(process.env.KEBOOLA_TOKEN);
    console.log(process.env.AWS_TOKEN);

    const id1 = await lib.getOrCreateWriter(shopName, '') 

    await lib.updateTransformation(
        id1,
        'Unified_block',
        'Shop unified',
        fs.readFileSync('./01_unification.sql', 'utf-8'),
        [`in.c-black-friday.${shopName}`],
        ['shop_raw','shop_neraw'],
        `out.c-0-${shopName}.${shopName}_unified`,
        'shop_unified',
    );
})
