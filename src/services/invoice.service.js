const PDFDocument = require('pdfkit');
const fs = require('fs');
const { convertDateToGMT7 } = require('../ultil/ultil.lib');

const fontPath = './src/assets/fonts/Roboto-Regular.ttf';
const logoPath = './src/assets/logo.png';

const rowHeight = 30;

function generateRowsData(invoice = {}) {
    const { items, service } = invoice;
    console.log(items);

    const rows = [
        ...items.map((item) => {
            return {
                name: item?.name,
                price: item?.price,
                quantity: item?.quantity,
            };
        }),
        {
            name: service?.name,
            price: service?.price,
            quantity: '1',
        },
    ];

    return rows;
}

function generateHeader(doc) {
    doc.image(logoPath, 50, 45, { width: 50 })
        .fillColor('#444444')
        .fontSize(20)
        .text('Shop Sửa Xe', 110, 57)
        .fontSize(10)
        .text('12A Trường Chinh', 200, 65, { align: 'right' })
        .text('phường Tân Thới Nhất, quận 12, TP. Hồ Chí Minh', 200, 80, {
            align: 'right',
        })
        .moveDown();
}

function generateFooter(doc) {
    const pageHeight = doc.page.height;

    const footerY = pageHeight - 100;

    doc.fontSize(10).text(
        'Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.',
        50,
        footerY,
        { align: 'center', width: 500 }
    );
}

function generateCustomerInformation(doc, invoice) {
    const { booking_id, full_address, items, service, user } = invoice;

    const totalPrice =
        items.reduce((acc, item) => acc + item.quantity * item.price, 0) +
        service.price;

    const customerInformationTop = 200;
    doc.fillColor('#444444').fontSize(20).text('Hóa đơn', 50, 160);
    generateHr(doc, 185);
    doc.fontSize(10)
        .text('Mã hóa đơn: ', 50, customerInformationTop)
        .text('Ngày tạo hóa đơn: ', 50, customerInformationTop + 15)
        .text('Tổng tiền: ', 50, customerInformationTop + rowHeight)

        .text(booking_id, 150, customerInformationTop)
        .text(convertDateToGMT7(new Date()), 150, customerInformationTop + 15)
        .text(totalPrice + ' VND', 150, customerInformationTop + rowHeight)

        .text('Tên khách hàng: ', 220, customerInformationTop)
        .text('Số điện thoại: ', 220, customerInformationTop + 15)
        .text('Địa chỉ sửa chữa: ', 220, customerInformationTop + rowHeight)

        .text(user ? `${user.fullname}` : '', 320, customerInformationTop)
        .text(user ? `${user.phone}` : '', 320, customerInformationTop + 15)
        .text(full_address || '', 320, customerInformationTop + rowHeight)

        .moveDown();
    generateHr(doc, 260);
}

function generateTableRow(doc, y, c1, c2, c3, c4, c5) {
    doc.fontSize(10)
        .text(c1, 50, y)
        .text(c2, 100, y, { width: 300 })
        .text(c3, 280, y, { width: 90, align: 'right' })
        .text(c4, 370, y, { width: 90, align: 'right' })
        .text(c5, 0, y, { align: 'right' });
}

function generateInvoiceTable(doc, invoice, rows) {
    let invoiceTableTop = 330;

    const { items, service } = invoice;

    // column label
    generateTableRow(
        doc,
        invoiceTableTop,
        'STT',
        'Tên sản phẩm / Dịch vụ',
        'Đơn giá',
        'Số lượng',
        'Tổng (VND)'
    );
    generateHr(doc, invoiceTableTop + 20);

    rows.map((row, index) => {
        const position = invoiceTableTop + (index + 1) * rowHeight + 10;
        const { name, price, quantity } = row;
        generateTableRow(
            doc,
            position,
            index + 1,
            name,
            formatCurrency(price),
            quantity,
            formatCurrency(price * quantity)
        );
        generateHr(doc, position + 20);
    });

    // Tạo tổng giá trị
    const totalPosition =
        invoiceTableTop +
        (invoice.items.length + 1) * rowHeight +
        rowHeight + // Thêm 1 dòng cho dịch vụ
        20;

    const totalPrice =
        items.reduce((acc, item) => acc + item.quantity * item.price, 0) +
        service.price;
    generateTableRow(
        doc,
        totalPosition,
        '',
        '',
        'Tổng cộng',
        '',
        formatCurrency(totalPrice)
    );
}

function generateHr(doc, y, color = '#bcc2be') {
    doc.strokeColor(color).lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatCurrency(value) {
    return Math.round(value);
}

const createInvoice = async (invoice, fileName) => {
    let doc = new PDFDocument({ margin: 50 });

    const rows = generateRowsData(invoice);

    const path = `./invoices/${fileName}`;

    doc.pipe(fs.createWriteStream(path));

    doc.font(fontPath);

    generateHeader(doc);
    generateCustomerInformation(doc, invoice);
    generateInvoiceTable(doc, invoice, rows);
    generateFooter(doc);

    doc.end();
};

module.exports = {
    createInvoice,
};
