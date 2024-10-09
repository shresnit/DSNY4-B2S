// We are creating constants/variables that we will use later on
const viz = document.getElementById("tableauViz");
let workbook;
let vizActiveSheet;
let dashboard;
let listSheets;
let saleMap;
let totalSales;
let salesByProduct;
let salesBySegment;


// Logging information about our workbook

function logWorkbookInformation() {
  //this is finding the workbook name
  workbook = viz.workbook;
  console.log(`The workbook name is ${workbook.name}`);

  // get the array of dashboards and stand alone sheets
  let sheets = workbook.publishedSheetsInfo;
    sheets.forEach((element) => {
      index = element.index;
      console.log(`The sheet wth index ${index} is: ${element.name}`);
    });
  
  // fnding the actual active worksheet
  vizActiveSheet = workbook.activeSheet;
  console.log(`The actve sheet is ${vizActiveSheet.name}`);

  // List all of the worksheets within the active sheet
   listSheets = vizActiveSheet.worksheets; 
   listSheets.forEach((element) => { 
    index = element.index;
    worksheetName = element.name;
    console.log(`The worksheet with index ${index} is ${worksheetName}`);
   });

   saleMap = listSheets.find((ws) =>ws.name == "SaleMap");
   totalSales = listSheets.find((ws) =>ws.name == "Total Sales");
   salesByProduct = listSheets.find((ws) =>ws.name == "SalesbyProduct");
   salesByProduct = listSheets.find((ws) =>ws.name == "SalesbySegment");

}

//Constants for buttons 
const oregonWashingtonButton = document.getElementById("oregon_and_washington"); 
const clearFilterButton = document.getElementById("clear_filter"); 
const undoButton = document.getElementById("undo");

//create functions for when buttons are pressed
function oregonWashFunction() { 
  console.log(oregonWashingtonButton.value); 
  saleMap.applyFilterAsync("State", ["Washington", "Oregon"], "replace"); 
  totalSales.applyFilterAsync("State", ["Washington", "Oregon"], "replace"); 
  salesByProduct.applyFilterAsync("State", ["Washington", "Oregon"], "replace"); 
  salesByProduct.applyFilterAsync("State", ["Washington", "Oregon"], "replace"); 
}

function clearStateFilter() {
  console.log(clearFilterButton.value);
  saleMap.clearFilterAsync("State");
  totalSales.clearFilterAsync("State");
  salesByProduct.clearFilterAsync("State");
  salesByProduct.clearFilterAsync("State");

}

function unDO() {
  console.log(undoButton.value)
  viz.undoAsync();
}

oregonWashingtonButton.addEventListener("click", oregonWashFunction);
clearFilterButton.addEventListener("click", clearStateFilter);
undoButton.addEventListener("click", unDO);

// Run our function, when the workbook becomes interactive
viz.addEventListener("firstinteractive", logWorkbookInformation);
