//rutina de soporte

function union(setTargetA, setTargetB) {
    const set_union = new Set(setTargetA);

    for (const elem of setTargetB) {
        set_union.add(elem);
    }

    return set_union;
}

function interseccion(setTargetA, setTargetB) {
    let set_interseccion = new Set()
    for (let elem of setTargetB) {
        if (setTargetA.has(elem)) {
            set_interseccion.add(elem)
        }
    }
    return set_interseccion;
}

function difSim(setTargetA, setTargetB) {
    let set_difSim = new Set(setTargetA)
    for (let elem of setTargetB) {
        if (set_difSim.has(elem)) {
            set_difSim.delete(elem)
        } else {
            set_difSim.add(elem)
        }
    }
    return set_difSim
}

function diferencia(setTargetA, setTargetB) {
    let set_diferencia = new Set(setTargetA)
    for (let elem of setTargetB) {
        set_diferencia.delete(elem)
    }
    return set_diferencia;
}


function randomArray(maxItem, maxValue, fLetter, fUnique)
{
    let arrayTarget = [];
    let arrayTarget1 = [];
    let fAdd = true;
    while(arrayTarget.length < maxItem)
    {
        let r = Math.floor(Math.random() * maxValue) + 1;

        fAdd = true;
        if (fUnique)
        {
            if(arrayTarget1.indexOf(r) === -1) 
            {
                fAdd = true;
            }
            else
            {
                fAdd = false;
            }
        }
        
        if (fAdd)
        {
            arrayTarget1.push(r)
            if (fLetter)
            {
                arrayTarget.push(String.fromCharCode(r + 96));
            }
            else
            {
                arrayTarget.push(r);
            }        
        }
    }

    return arrayTarget;
}

function date2str(dteTarget)
{
    let strRet = "";

    let strMonth = dteTarget.getMonth().toString();
    if (strMonth.length == 1)
    {
        strMonth = "0" + strMonth;
    }

    let strDay = dteTarget.getDate().toString();
    if (strDay.length == 1)
    {
        strDay = "0" + strDay;
    }

    strRet = dteTarget.getFullYear().toString() + "-" + strMonth + "-" + strDay

    return strRet;
}

function swap(items, leftIndex, rightIndex)
{
    let temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}

function partition(items, left, right) 
{
    let pivot   = items[Math.floor((right + left) / 2)], 
        i = left, 
        j = right; 
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j); 
            i++;
            j--;
        }
    }
    return i;
}

function quickSort(items, left, right) 
{
    let indx = 0;
    if (items.length > 1) {
        indx = partition(items, left, right); 
        if (left < index - 1) { 
            quickSort(items, left, indx - 1);
        }
        if (indx < right) { 
            quickSort(items, indx, right);
        }
    }
    return items;
}

function createTableApi(items, nLastPosition)
{
    const formatter = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 2
      });
      
    const lastItems = items.slice(-nLastPosition);
    let newTable = document.createElement("table");
    newTable.setAttribute("class","sty01");

    let newHead = newTable.createTHead();
    let newRowHead1 = newHead.insertRow(0);

    let newCellHead1 = document.createElement("th");
    let newCellHead2 = document.createElement("th");
    newRowHead1.appendChild(newCellHead1);
    newRowHead1.appendChild(newCellHead2);

    newCellHead1.setAttribute("class","sty05");
    newCellHead2.setAttribute("class","sty05");
    newCellHead1.innerHTML = "Fecha";
    newCellHead2.innerHTML = "Tipo de cambio";


    for(let indx = 0; indx < lastItems.length; indx++)
    {
        let newRow = document.createElement("tr");
        
        let newCol1 = document.createElement("td");
        let newCol2 = document.createElement("td");

        const newCols = lastItems[indx].split("|");

        newCol1.innerText = newCols[0];
        newCol2.innerText = formatter.format(newCols[1]);

        newRow.appendChild(newCol1);
        newRow.appendChild(newCol2);

        newTable.appendChild(newRow);
    }    
    return newTable;
}


//rutinas ejecucion de ejercicios
//año bisiesto?
function e1()
{    
    const yearTarget = parseInt($("#year").val());
    const isLeapYear =  (yearTarget % 100 === 0) ? (yearTarget % 400 === 0) : (yearTarget % 4 === 0); 
    $("#yearOut").val(isLeapYear ? 'SI':'NO');
}

//generacion de table
function e2()
{
    const totalRow = parseInt($("#tableRow").val());
    const totalCol = parseInt($("#tableCol").val());

    let newTable = document.createElement("table");
    newTable.setAttribute("class","sty01");

    for (let indx = 0; indx < totalRow; indx++)
    {
        let newRow = document.createElement("tr");
        for (let indx1 = 0; indx1 < totalCol; indx1++)
        {
            let newCol = document.createElement("td");
            newCol.innerHTML= "&nbsp;";
            newRow.appendChild(newCol);
        }
        newTable.appendChild(newRow);
    }
    
    $("#tableOutput").empty();

    $("#tableOutput").append(newTable);
}

//ordenacion de arreglo
function e3()
{
    
    let arrayTarget = randomArray(20, 100, false, false);
    
    let strArrayTarget = "";
    strArrayTarget = arrayTarget.join(",");
    $("#array2sort").val(strArrayTarget);

    arraySorted = quickSort(arrayTarget, 0, arrayTarget.length - 1);

    strArrayTarget = "";
    strArrayTarget = arraySorted.join(",");
    $("#arraySorted").val(strArrayTarget);
}

//operacion con conjuntos
function e4()
{
    const strArrayA = randomArray(10, 26, true, true);
    const strArrayB = randomArray(10, 26, true, true);

    $("#set_A").val(strArrayA);
    $("#set_B").val(strArrayB);

    let setA = new Set(strArrayA);
    let setB = new Set(strArrayB);

    let setUnion = union(setA, setB);
    $("#setUnion").val(Array.from(setUnion));

    let setInter = interseccion(setA, setB);
    $("#setIntersection").val(Array.from(setInter));

    let setDif = diferencia(setA, setB);
    $("#setDiferencia").val(Array.from(setDif));

    let setDifSim = difSim(setA, setB);
    $("#setDifSim").val(Array.from(setDifSim));
}

//consulta de api
//https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF343410/datos/2022-03-12/2022-03-22?token=8df242ac283f4ae3ba42760cc343062355a39f764bdc994d13abc2f9bd801726
function e5()
{
    let strUrl = "https://www.banxico.org.mx/SieAPIRest/service/v1/series/%id%/datos/%fi%/%ff%?token=%token%";

    let fIni = $("#FechaIniApi").val();
    let fFin = $("#FechaFinApi").val();
    let strIdSerie = $("#indicadorApi").val();
    let strtoken = $("#tokenApi").val();

    strUrl = strUrl.replace("%id%", strIdSerie);
    strUrl = strUrl.replace("%fi%", fIni);
    strUrl = strUrl.replace("%ff%", fFin);
    strUrl = strUrl.replace("%token%", strtoken);

    console.log(strUrl);
    
    $.ajax({
        url:strUrl,
        jsonp : "callback",
        dataType : "jsonp",
        type:"GET",
        contentType:"application/json",
        success: function(data) {
            let series=data.bmx.series;
            let rowArray = [];

            let serie=series[0];
            for(let indx1 in serie.datos)
            {
                let row = serie.datos[indx1].fecha+'|'+serie.datos[indx1].dato;
                rowArray.push(row);
            }

            $("#tableApiOutput").empty();
            let newTable = createTableApi(rowArray, 5);
            $("#tableApiOutput").append(newTable);
        },
        error: function(data ){
          console.log("Something went wrong");
        }
      });    
}

function iniApiParameter()
{    
    const keyApi = "8df242ac283f4ae3ba42760cc343062355a39f764bdc994d13abc2f9bd801726";
    const idSerie = "SF343410";
    let dteToday = new Date();
    let dteIniDate = new Date();    

    dteIniDate.setDate(dteIniDate.getDate()-15);
    let strFechaFin = date2str(dteToday);
    let strFechaIni = date2str(dteIniDate);

    $("#tokenApi").prop('disabled', true);
    $("#tokenApi").val(keyApi);
    $("#indicadorApi").val(idSerie);
    $("#FechaIniApi").val(strFechaIni);
    $("#FechaFinApi").val(strFechaFin);


}


//bind con los botones
function init()
{    
    $("#btn1").on( "click", e1);
    $("#btn2").on( "click", e2);
    $("#btn3").on( "click", e3);
    $("#btn4").on( "click", e4);
    $("#btn5").on( "click", e5);
    iniApiParameter();
}

