let {validateEmail} = require('../utils/functions')

describe("Mail validator", function () {
    test("long address", function () {
        let long1 = validateEmail('marvinsamouelian00@googlemail.com');
        let long2 = validateEmail('marvin.samouelian00@googlemail@.com');
        let long3 = validateEmail('987324bjkfe/%&/%/.com');
        let long4 = validateEmail('987324bjkfe/%&/%/.de');

        expect(long1).toEqual(true);
        expect(long2).toEqual(false);
        expect(long3).toEqual(false);
        expect(long4).toEqual(false);
    });
    test("short address", function () {
            let short1 = validateEmail('marvsman@gm.com');
            let short2 = validateEmail('mar.vs.ma.n@g@m-com');

            expect(short1).toEqual(true);
            expect(short2).toEqual(false);
    })
})