export class IconUtils {
    static range(start: number, end: number): any {
        console.log(start,end)
        var list = [];
        for (var i = start; i <= end; i++) {
            list.push({ value: i });
        }
        console.log(list)
        return list;
    } 

    static showTextForListItem(list, item) {
        return item && list && (list.find(e => '' + e.Value === '' + item) || {Text:''}).Text;
    }    
}