function generateValues(l)
{
    let val_data='';
    for(let i=0;i<l;i++)
    {
        if(i===l-1)
            val_data=val_data+" :"+(i+1);
        else    
            val_data=val_data+" :"+(i+1)+",";
    }

    return val_data;
}

function generateColumnAttributes(header)
{
    let columnfielddata='';
    for(let i=0;i<header.length;i++)
    {
        if(i===header.length-1)
            columnfielddata=columnfielddata+"\""+header[i].toUpperCase()+"\"";
        else
            columnfielddata=columnfielddata+"\""+(header[i].toUpperCase())+"\",";
    }
    return columnfielddata;

}

function checkNUllandUndefined(data){
    if(data === undefined || data === null) {
        return true;
    }
    else{
        return false;
    }
}

exports.checkNUllandUndefined=checkNUllandUndefined;
exports.generateValues=generateValues;
exports.generateColumnAttributes=generateColumnAttributes;