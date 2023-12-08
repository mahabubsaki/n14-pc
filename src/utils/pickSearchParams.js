import { Types } from "mongoose";

export default function pickSearchParams(obj, fields) {
    const dataObj = {};
    fields.forEach(i => {

        if (obj[i]) {

            if (i === 'title') {

                dataObj[i] = { $regex: new RegExp(obj[i], "i") };
            } else if (i === 'publisher') {
                dataObj[i] = Types.ObjectId.isValid(obj[i]) ? obj[i] : new Types.ObjectId();
            } else if (i === 'tags') {
                console.log({ s: obj[i].split('-') });
                dataObj[i] = {
                    $all: obj[i].split('-'),
                };
            }


        }
    });


    return dataObj;
}