import emv from 'node-emv';

const toByteArray = (text) => {
    return text.match(/.{1,2}/g).map((b) => parseInt(b, 16));
};

const toHexString = (byteArr) => {
    return byteArr.reduce(
        (acc, byte) => acc + ('00' + byte.toString(16).toUpperCase()).slice(-2),
        ''
    );
};

const getEmvInfo = (info) => {
    return new Promise((resolve) => {
        emv.describe(info, (data) => {
            resolve(data || null);
        });
    });
};

const getCardInfoVisa = (responses) => {
    let result = null;
    for (const r of responses) {
        if (r.tag === '77' && r.value) {
            for (const e of r.value) {
                if (e.tag === '57' && e.value) {
                    const parts = e.value.split('D');
                    if (parts.length > 1) {
                        result = {
                            card: parts[0],
                            exp: parts[1].substring(0, 4),
                        };
                        return result;
                    }
                }
            }
        }
    }
    return result;
};

const getCardInfoMasterCard = (responses) => {
    let result = {};
    for (const r of responses) {
        if (r.tag === '70' && r.value) {
            for (const e of r.value) {
                if (e.tag === '5A' && e.value) {
                    result.card = e.value;
                }
                if (e.tag === '5F24' && e.value) {
                    result.exp = e.value;
                }
                if (result.card && result.exp) {
                    return result;
                }
            }
        }
    }
    return result;
};

export {
    toByteArray,
    toHexString,
    getEmvInfo,
    getCardInfoVisa,
    getCardInfoMasterCard,
};