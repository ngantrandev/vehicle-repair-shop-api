const moment = require('moment');

const {
    sortObject,
    buildQueryParams,
    getChecksum,
} = require('@/src/ultil/ultil.lib');

const VnpTmnCode = process.env.VNP_TMN_CODE || '';
const BaseUrl = process.env.VNP_BASE_URL || '';
const VnpReturnUrl = process.env.VNP_RETURN_URL || '';

/**
 * data = {amout, service_name, invoice_id, date}
 */
const createReturnUrl = (data) => {
    const { amount, service_name, invoice_id, date } = data;

    // create new date after 2 minus
    const newDate = new Date(date.getTime() + 20 * 60 * 1000); // Cộng thêm 2 phút

    const createDate = moment(date).format('YYYYMMDDHHmmss');
    const exprireTime = moment(newDate).format('YYYYMMDDHHmmss');
    const txnRef = `GIAODICH_${invoice_id}_${moment(date).format('DDHHmmss')}`;
    const orderInfo = `Thanh toán dịch vụ ${service_name} va cac san pham dat cung`;

    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.1';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_CurrCode'] = 'VND';
    vnp_Params['vnp_IpAddr'] = '123.20.175.201';
    vnp_Params['vnp_Locale'] = 'vn';
    vnp_Params['vnp_OrderType'] = 'orther';
    vnp_Params['vnp_TmnCode'] = VnpTmnCode;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_CreateDate'] = createDate;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_ReturnUrl'] = VnpReturnUrl;
    vnp_Params['vnp_ExpireDate'] = exprireTime;
    vnp_Params['vnp_TxnRef'] = txnRef;

    vnp_Params = sortObject(vnp_Params);

    const searchParams = buildQueryParams(vnp_Params);
    const signData = searchParams.toString();

    const secureHash = getChecksum(signData);

    searchParams.append('vnp_SecureHash', secureHash);

    const vnpUrl = BaseUrl + '?' + searchParams.toString();

    return vnpUrl;
};

const vnpService = {
    createReturnUrl,
};

module.exports = vnpService;
