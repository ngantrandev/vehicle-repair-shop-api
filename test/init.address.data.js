const fetch = require('node-fetch');
const fs = require('fs');

const generateSQLCommands = async () => {
    console.log('Fetching data');

    const response = await fetch('https://esgoo.net/api-tinhthanh/4/0.htm');
    const data = await response.json();

    const provinces = data.data;

    console.log('Generating SQL commands...');
    let sqlCommands = '';

    for (const province of provinces) {
        const provinceId = province.id;
        const provinceName = province.full_name;
        const districts = province.data2;

        sqlCommands += `INSERT INTO provinces (id, name) VALUES (${provinceId}, '${provinceName.replace(
            "'",
            "''"
        )}') ON DUPLICATE KEY UPDATE name = VALUES(name);\n`;

        for (const district of districts) {
            const districtId = district.id;
            const districtName = district.full_name;
            const wards = district.data3;

            sqlCommands += `INSERT INTO districts (id, name, province_id) VALUES (${districtId}, '${districtName.replace(
                "'",
                "''"
            )}', ${provinceId}) ON DUPLICATE KEY UPDATE name = VALUES(name);\n`;

            for (const ward of wards) {
                const wardId = ward.id;
                const wardName = ward.full_name;

                sqlCommands += `INSERT INTO wards (id, name, district_id) VALUES (${wardId}, '${wardName.replace(
                    "'",
                    "''"
                )}', ${districtId}) ON DUPLICATE KEY UPDATE name = VALUES(name);\n`;
            }
        }
    }

    fs.writeFileSync(__dirname + '/init_data_address.sql', sqlCommands, 'utf8');
    console.log('SQL commands generated and saved to init_data_address.sql');
};

generateSQLCommands();
