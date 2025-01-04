import {
    sortObject,
    buildQueryParams,
    getChecksum,
} from '@/src/ultil/ultil.lib';
import { VnpReturnUrlParams } from '@/src/types/vnpay';

const VnpTmnCode = process.env.VNP_TMN_CODE || '';
const BaseUrl = process.env.VNP_BASE_URL || '';
const VnpReturnUrl = process.env.VNP_RETURN_URL || '';

export const createReturnUrl = (data: {
    amount: number;
    orderInfo: string;
    createDate: string;
    expireDate: string;
    txnRef: string;
}): string => {
    const { amount, orderInfo, createDate, expireDate, txnRef } = data;

    let vnp_Params: VnpReturnUrlParams = {
        vnp_Version: '',
        vnp_Command: '',
        vnp_CurrCode: '',
        vnp_IpAddr: '',
        vnp_Locale: '',
        vnp_OrderType: '',
        vnp_TmnCode: '',
        vnp_Amount: 0,
        vnp_CreateDate: '',
        vnp_OrderInfo: '',
        vnp_ReturnUrl: '',
        vnp_ExpireDate: '',
        vnp_TxnRef: '',
    };
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
    vnp_Params['vnp_ExpireDate'] = expireDate;
    vnp_Params['vnp_TxnRef'] = txnRef;

    vnp_Params = sortObject(vnp_Params) as VnpReturnUrlParams;

    const searchParams = buildQueryParams(vnp_Params);
    const signData = searchParams.toString();

    const secureHash = getChecksum(signData);

    searchParams.append('vnp_SecureHash', secureHash);

    const vnpUrl = BaseUrl + '?' + searchParams.toString();

    return vnpUrl;
};
