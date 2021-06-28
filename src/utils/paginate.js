import _ from "lodash";

export function paginate(items,pageSize,pageNumber){
    const startIndex=pageSize * (pageNumber-1);
    return _(items).slice(startIndex).take(pageSize).value();
}