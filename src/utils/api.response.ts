import { ApiProperty } from "@nestjs/swagger";
import slugify from "slugify";
import * as crypto from "crypto";
import moment from "moment";

export class BaseController {
    static sendResponse(data, message = "OK", statusCode = 200, status = true) {
        return { data, message, statusCode, status };
    }


    /**
    * Build survey(s) metadata
    * @param {Object} surveys the survey results
    * @param {number} page current page
    */
   static buildMetaData(channels: any, page: number, channelsCount: number) {
        return {
        query_results: channels.length,
        page,
        comment:
            channels.length == 0
            ? "No Channel to display"
            : `Showing ${channels.length} of ${channelsCount} results`,
        };
    }
     /**
    * gets offset value
    * @param page
    * @param limit
    */
   static getOffsetValue(page: number, limit: number) {
    let offset: number = 0;
    if (page == 1) {
      return offset;
    }

    offset = page * limit;
    if (page > 1) {
      offset++;
    }
    return offset;
  }

  static generateUniqueIdentifier(length) {
    let text = "";
    let possible = "1234567890";
    for (let i = 0; i < length; i++) {
      let sup = Math.floor(Math.random() * possible.length);
      text += i > 0 && sup == i ? "0" : possible.charAt(sup);
    }
    return Number(text);
  }


  static myUniqueID(range: number) {
    let text = "";
    let possible = "1234567890";
    for (let i = 0; i < 4; i++) {
      let sup = Math.floor(Math.random() * possible.length);
      text += i > 0 && sup == i ? "0" : possible.charAt(sup);
    }
    let m = moment();
    let ms = m.milliseconds() + 1000 * (m.seconds() + 60 * (m.minutes() + 60 * m.hours()));
    return Math.floor(Math.pow(10, range - 1) + Number(text) + Math.random() * 9 * Math.pow(10, range - 1) + ms);
  }

  /**
   * Create a new slug (unique url string) for the product
   * @param {string} str the product title
   * @return {string} the new slug string
   */
  static createSlug = async (str: string) => {
    let newString = slugify(str, {
      remove: /[*+~.()'"!?:@#${}<>,]/g,
      lower: true,
    });
    const random =  crypto.randomBytes(6).toString("hex");
    newString = `${newString}-${random}`;
    return newString;
  }
}


export class ApiUserDto<TData> {
    @ApiProperty()
    status: boolean;
  
    @ApiProperty()
    statusCode: number;
  
    @ApiProperty()
    message: string;
  
    Data: TData;
  }
  