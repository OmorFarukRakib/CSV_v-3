// Funstion to set status depending on the track id starts
// Checking the validation of each track ID via API starts
const ValidationOfTrackID = async (TrackID, _callback) => {
  //var TRACKID = $(`#csvRoot tr:nth-child(${serialNo}) td:nth-child(3)`).text();
  var TRACKID = TrackID;
  //$("#csvRoot tr").each(function (index) {
  console.log(`click hoise track ID ${TRACKID}`);

  var LOGINID = "rakib";
  var TOKEN =
    "dGftO0dyKPR06cgvBbpsWE9HsJdt9w2i5EmWYdUuxpTT5rcGWdNBVTU5622KyjTyLwt69mxbG9UbwmGo4nGNzqsgILIEP6RG8mVKK5WkFxa4GNuQjXMR1BKDMxLU9k8n";
  //var TRACKID = "3062447746611948160"; // True
  // var TRACKID = "306244774661194asdasd"; // False
  //var TRACKID = "TrackID"; // False
  var URL = "http://trackdev.ultra-x.jp/ettms_api/track_header/validate";
  const ans = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      LOGINID: LOGINID,
      TOKEN: TOKEN,
      TRACKID: TRACKID,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data.VALID;
    })
    .then((result) => {
      if (result) {
        return "Valid";
      } else {
        return "Invalid";
      }
    })
    .catch((err) => {
      console.log(err);
      return "Failed";
    });
  _callback(ans);
};
// Checking the validation of each track ID via API ends

// setting status column for single row based on validation starts
async function setValid_Invalid_Status_for_single_row(index, is_TrackID_Changed) {
  // let totalData = $("#csvRoot").DataTable().data().count();
  // let iColumns = $("#csvRoot thead th").length;
  // let totalRow = totalData / iColumns;

  // $("#VALIDATION_LOADING_DIV")
  //   .removeClass("VALIDATION_LOADING_diplayNone")
  //   .addClass("VALIDATION_LOADING");
  var TrackID = $(`#csvRoot tr:nth-child(${index}) td:nth-child(3)`).text();
  if (TrackID) {
    if (is_TrackID_Changed){
      ValidationOfTrackID(TrackID, (status) => {
        //console.log(`CALL BACK A ATA ASHSE for i = ${i} -> ${status}`);
        if (status == "Valid") {
          $(`#csvRoot tr:nth-child(${index}) td:nth-child(2)`).html(`Valid`);
          $(`#csvRoot tr:nth-child(${index}) td:nth-child(2)`).css(
            "color",
            "green"
          );
        } else if (status == "Invalid") {
          $(`#csvRoot tr:nth-child(${index}) td:nth-child(2)`).html(`InValid`);
          $(`#csvRoot tr:nth-child(${index}) td:nth-child(2)`).css(
            "color",
            "red"
          );
        } else if (status == "Failed") {
          $(`#csvRoot tr:nth-child(${index}) td:nth-child(2)`).html(
            `Validation Failed`
          );
          $(`#csvRoot tr:nth-child(${index}) td:nth-child(2)`).css(
            "color",
            "red"
          );
        }
        calculateStatusInfo();
      });
    }
  } else {
    $(`#csvRoot tr:nth-child(${index}) td:nth-child(2)`).html(`Empty`);
    $(`#csvRoot tr:nth-child(${index}) td:nth-child(2)`).css("color", "blue");
    calculateStatusInfo();
  }
  // if (i == totalRow) {
  //   $("#VALIDATION_LOADING_DIV")
  //     .removeClass("VALIDATION_LOADING")
  //     .addClass("VALIDATION_LOADING_diplayNone");
  // }
}
// setting status column for single row based on validation ends

// Checking setting the status column based on validation starts
async function setValid_Invalid_Status() {
  let totalData = $("#csvRoot").DataTable().data().count();
  let iColumns = $("#csvRoot thead th").length;
  let totalRow = totalData / iColumns;
  for (let i = 1; i <= totalRow; i++) {
    // $("#VALIDATION_LOADING_DIV")
    //   .removeClass("VALIDATION_LOADING_diplayNone")
    //   .addClass("VALIDATION_LOADING");
    var TrackID = $(`#csvRoot tr:nth-child(${i}) td:nth-child(3)`).text();
    if (TrackID) {
      let TrackIDCurrentStatus = $(
        `#csvRoot tr:nth-child(${i}) td:nth-child(2)`
      ).text();
      if (TrackIDCurrentStatus === "Auto Generated") {
        continue;
      } else {
        ValidationOfTrackID(TrackID, (status) => {
          //console.log(`CALL BACK A ATA ASHSE for i = ${i} -> ${status}`);
          if (status == "Valid") {
            $(`#csvRoot tr:nth-child(${i}) td:nth-child(2)`).html(`Valid`);
            $(`#csvRoot tr:nth-child(${i}) td:nth-child(2)`).css(
              "color",
              "green"
            );
          } else if (status == "Invalid") {
            $(`#csvRoot tr:nth-child(${i}) td:nth-child(2)`).html(`InValid`);
            $(`#csvRoot tr:nth-child(${i}) td:nth-child(2)`).css(
              "color",
              "red"
            );
          } else if (status == "Failed") {
            $(`#csvRoot tr:nth-child(${i}) td:nth-child(2)`).html(
              `Validation Failed`
            );
            $(`#csvRoot tr:nth-child(${i}) td:nth-child(2)`).css(
              "color",
              "red"
            );
          }
          calculateStatusInfo();
        });
      }
    } else {
      $(`#csvRoot tr:nth-child(${i}) td:nth-child(2)`).html(`Empty`);
      $(`#csvRoot tr:nth-child(${i}) td:nth-child(2)`).css("color", "blue");
      calculateStatusInfo();
    }
    // if (i == totalRow) {
    //   $("#VALIDATION_LOADING_DIV")
    //     .removeClass("VALIDATION_LOADING")
    //     .addClass("VALIDATION_LOADING_diplayNone");
    // }
  }
}
// Checking setting the status column based on validation ends

// Funstion to set status depending on the track id ends

// Functions to get the date
const autoTrackIDGenerator = () => {
  var d = new Date();
  var strDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
  return strDate;
};

// Funstion to update status depending on the track id starts
const updateStatus = () => {
  $("#csvRoot tr").each(function (index) {
    console.log(`click hoise index ${index}`);
    $(this).find("td:nth-child(1)").html(index);
    if ($(this).find("td:nth-child(3)").text().trim() == "") {
      $(this).find("td:nth-child(2)").html(`Auto Generated`);
      $(this).find("td:nth-child(3)").html(autoTrackIDGenerator());
    }
  });
};
// Funstion to update status depending on the track id ends

// Function to calculate status info and show them in the status card STARTS
const calculateStatusInfo = () => {
  let totalData = $("#csvRoot").DataTable().data().count();
  let iColumns = $("#csvRoot thead th").length;
  let totalRow = totalData / iColumns;
  let totalValidIDCount = 0;
  let totalInvalidIDCount = 0;
  let TotalNumberOfNewlyGeneratedTrackID =0;
  $("#TotalNumberOfTrackID").text(totalRow);
  //$("#TotalNumberOfEmptyTrackID").text(totalRow);

  let totalEmptyRows = $("#csvRoot tr td:nth-child(3):empty").length;
  $("#TotalNumberOfEmptyTrackID").text(totalEmptyRows);

  $("#csvRoot tr").each(function (index) {
    console.log($(this).find("td:nth-child(2)").html());
    if ($(this).find("td:nth-child(2)").text().trim() == "Valid") {
      totalValidIDCount++;
    } else if ($(this).find("td:nth-child(2)").text().trim() == "InValid") {
      totalInvalidIDCount++;
    } else if ($(this).find("td:nth-child(2)").text().trim() == "Auto Generated") {
      TotalNumberOfNewlyGeneratedTrackID++;
    }
  });
  $("#TotalNumberOfValidTrackID").text(totalValidIDCount);
  $("#TotalNumberOfInvalidTrackID").text(totalInvalidIDCount);
  $("#TotalNumberOfNewlyGeneratedTrackID").text(
    TotalNumberOfNewlyGeneratedTrackID
  );
};
// Function to calculate status info and show them in the status card ENDS

// Function to update serial no column value STARTS
const updateSerialNo = () => {
  $("#csvRoot tr").each(function (index) {
    $(this).find("td:nth-child(1)").html(index);
  });
};
// Function to update serial no column value ENDS

//_________________________________________________________________________________________________
//_________________________________________________________________________________________________
//_________________________________________________________________________________________________
//_________________________________________________________________________________________________
//_________________________________________________________________________________________________
// Implementing pop up model's data for editing
$(document).ready(function () {
  var row_index;
  $("#csvRoot").on("click", ".editbtn", function () {
    row_index = $(this).closest("tr").index();
    console.log(`ata akhn click kora button er index: ${row_index}`);
    console.log("Press Hoise EDIT");
    var $tr = $(this).closest("tr");
    console.log($tr.html());
    var data = $tr
      .children("td")
      .map(function () {
        return $(this).text();
      })
      .get();

    console.log(data);

    $("#TrackIDEdit").val(data[2]);
    $("#DeviceIDEdit").val(data[3]);
    $("#DeviceVendorEdit").val(data[4]);
    $("#deviceModelEdit").val(data[5]);
    $("#DeviceSerialEdit").val(data[6]);
    $("#MemoEdit").val(data[7]);

    /// replace with existing row when submitted
    $("#EditForm").submit(function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();

      console.log("SUBMIT HOISE MAMAA");
      // var idEdit = $("input[name=IDEdit]").val();
      var TrackIDEdit = $("input[name=TrackIDEdit]").val();
      var DeviceIDEdit = $("input[name=DeviceIDEdit]").val();
      var DeviceVendorEdit = $("input[name=DeviceVendorEdit]").val();
      var deviceModelEdit = $("input[name=deviceModelEdit]").val();
      var DeviceSerialEdit = $("input[name=DeviceSerialEdit]").val();
      var MemoEdit = $("input[name=MemoEdit]").val();

      //console.log(deviceRatingEdit);

      var temp = $("#csvRoot").DataTable().row(row_index).data();
      console.log("ata data before edit-> " + temp + " -> ");
      temp[2] = TrackIDEdit;
      temp[3] = DeviceIDEdit;
      temp[4] = DeviceVendorEdit;
      temp[5] = deviceModelEdit;
      temp[6] = DeviceSerialEdit;
      temp[7] = MemoEdit;
      console.log("ata data after edit-> " + temp + " -> ");
      var tableRow = row_index; // GET TABLE ROW NUMBER
      // Updating existed row data with new data and row number
      $("#csvRoot").dataTable().fnUpdate(temp[2], [tableRow], 2, true);
      $("#csvRoot").dataTable().fnUpdate(temp[3], [tableRow], 3, true);
      $("#csvRoot").dataTable().fnUpdate(temp[4], [tableRow], 4, true);
      $("#csvRoot").dataTable().fnUpdate(temp[5], [tableRow], 5, true);
      $("#csvRoot").dataTable().fnUpdate(temp[6], [tableRow], 6, true);
      $("#csvRoot").dataTable().fnUpdate(temp[7], [tableRow], 7, true);

      $("#editModalClose").click();
      var is_TrackID_Changed;
      if (data[2] === TrackIDEdit){
        is_TrackID_Changed = 0;
      }else{
        is_TrackID_Changed =1;
      }

      $("input[name=TrackIDEdit]").val("");
      $("input[name=DeviceIDEdit]").val("");
      $("input[name=DeviceVendorEdit]").val("");
      $("input[name=deviceModelEdit]").val("");
      $("input[name=DeviceSerialEdit]").val("");
      $("input[name=MemoEdit]").val("");
      //setValid_Invalid_Status();
      setValid_Invalid_Status_for_single_row(row_index + 1, is_TrackID_Changed);
    });
  });
});

// For Inserting New Row
$(document).ready(function () {
  $("#InsertForm").submit(function (event) {
    event.preventDefault();

    let TrackID = $("input[name=TrackID]").val();
    let DeviceID = $("input[name=DeviceID]").val();
    let DeviceVendor = $("input[name=DeviceVendor]").val();
    let DeviceModel = $("input[name=DeviceModel]").val();

    let DeviceSerial = $("input[name=DeviceSerial]").val();
    let Memo = $("input[name=Memo]").val();

    var NewROW = `<td class="table-data sorting_1" contenteditable="false"></td>  
    
                              <td class="table-data" contenteditable="false"></td> 

                              <td class="table-data" contenteditable="false">${TrackID}</td> 
                              
                              <td class="table-data" contenteditable="false">${DeviceID}</td>                                    
                              
                              <td class="table-data" contenteditable="false">${DeviceVendor}</td>                                    
                              
                              <td class="table-data" contenteditable="false">${DeviceModel}</td>                                    
                              
                              <td class="table-data" contenteditable="false">${DeviceSerial}</td>                                    
                              
                              <td class="table-data" contenteditable="false">${Memo}</td>                                    
                              
                        <td>
                          <div class="actionOptions">
                            
                              <button class="editbtn btn mr-2 btn-sm" data-toggle="modal" data-target="#editModal">Edit</button>
                            
                             
                              <button class="deleteRow btn btn-danger btn-sm">Delete</button>
                           
                          </div>
                        </td>    `;

    $("#csvRoot")
      .DataTable()
      .row.add($("<tr> " + NewROW + " </tr>"))
      .draw();

    $("#closeInsertModal").click();

    $("input[name=TrackID]").val("");
    $("input[name=DeviceID]").val("");
    $("input[name=DeviceVendor]").val("");
    $("input[name=DeviceModel]").val("");
    $("input[name=DeviceSerial]").val("");
    $("input[name=Memo]").val("");

    // scrolling to the bottom for every new row entry starts
    var $scrollBody = $($("#csvRoot").DataTable().table().node()).parent();
    $scrollBody.scrollTop($scrollBody.get(0).scrollHeight);
    updateSerialNo();
    setValid_Invalid_Status();
  });
});

// Close the main modal through close button
$("#closeMainModal").on("click", function (e) {
  $("#mainModal").modal("hide");
});

//For custom Project Name input starts
$(document).ready(function () {
  const inputs = document.querySelectorAll("input");

  inputs.forEach((el) => {
    el.addEventListener("blur", (e) => {
      if (e.target.value) {
        e.target.classList.add("dirty");
      } else {
        e.target.classList.remove("dirty");
      }
    });
  });
});
//For custom Project Name input Ends

// Delete Row starts

$("#csvRoot").on("click", ".deleteRow", function () {
  var checkstr = confirm("Are you sure you want to delete this row?");

  if (checkstr == true) {
    $("#csvRoot").DataTable().row($(this).parents("tr")).remove().draw();
    calculateStatusInfo();
    updateSerialNo();
  } else {
    return false;
  }
});

// Delete row ends
//______________________________________________________________________________________________________

// Table downloader: Download table as csv/xlsx/text formate starts
jQuery(document).ready(function () {
  let clicked = true;
  $("#csv-export-btn").on("click", function (e) {
    $(".tableexport-caption").show();
    $(".tableexport-caption").prepend("<p>Test</p>");
    e.preventDefault();
    if (clicked) {
      ResultsToTable();

      clicked = false;
    }
  });

  function ResultsToTable() {
    // scrolling to the bottom for every new row entry starts
    // var $scrollBody = $($("#csvRoot").DataTable().table().node()).parent();
    // $scrollBody.scrollTop($scrollBody.get(0).scrollHeight);
    // scrolling to the bottom for every new row entry ends
    var uploadedFileName = $("#csvFileInput").val().split("\\").pop();
    uploadedFileName = uploadedFileName.split(".").slice(0, -1).join(".");
    var lastIndex = $("#csvRoot tr:nth-child(1) td:last").index(); // This will get the last column index num so that action column is not downloaded

    $("#csvRoot").tableExport({
      headers: true, // (Boolean), display table headers (th or td elements) in the <thead>, (default: true)
      footers: true, // (Boolean), display table footers (th or td elements) in the <tfoot>, (default: false)
      formats: ["xlsx", "csv", "txt"], // (String[]), filetype(s) for the export, (default: ['xlsx', 'csv', 'txt'])
      filename: uploadedFileName, // (id, String), filename for the downloaded file, (default: 'id')
      // bootstrap: false,                   // (Boolean), style buttons using bootstrap, (default: true)
      //exportButtons: true,                // (Boolean), automatically generate the built-in export buttons for each of the specified formats (default: true)
      position: "top", // (top, bottom), position of the caption element relative to table, (default: 'bottom')
      ignoreRows: null, // (Number, Number[]), row indices to exclude from the exported file(s) (default: null)
      ignoreCols: [0, 1, lastIndex], // (Number, Number[]), column indices to exclude from the exported file(s) (default: null)
      trimWhitespace: true, // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s) (default: false)
      RTL: false, // (Boolean), set direction of the worksheet to right-to-left (default: false)
      sheetname: uploadedFileName, // (id, String), sheet name for the exported spreadsheet, (default: 'id')
    });
    //<i class="fas fa-times"></i>
    //$(".tableexport-caption").prepend(`<button id="clk">X</button>`);
    $(".tableexport-caption").prepend(
      `<button id="donwload-Modal-Close-btn" type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>`
    );
    $("#donwload-Modal-Close-btn").on("click", function (e) {
      //console.log(`clikkkkkk mamaa`);
      //$("#mainModal").modal("hide");
      var container = $(".tableexport-caption");
      container.remove();
      container.hide();
    });

    tableExport().reset(); // Reset tableExport for updated table
  }
});

$(document).mouseup(function (e) {
  var container = $(".tableexport-caption");

  // if the target of the click isn't the container nor a descendant of the container
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    container.remove();
    container.hide();
  }
});

// Showing the download button when file uploaded
$("#csvFileInput").on("input", function () {
  $(".csv-export-btn-div").show();
});

// Setting the file name in the top bar
function fileSelect(e) {
  console.log(e.target.files[0].name);
  let csvFilename = e.target.files[0].name;
  $("#csvName").html("File Name: " + csvFilename + "&nbsp;&nbsp;");
}

// Table downloader: Download table as csv/xlsx/text formate ends
//_____________________________________________________________________________________________________________

// Showing table modal controller button click starts
$(document).ready(function () {
  $("#showModal").on("click", function (e) {
    if (document.getElementById("csvFileInput").files.length == 0) {
      alert("No File Selected");
    } else {
      $("#modalButton").click();
    }
  });
});
// Showing table modal controller button click ends

//AutoTrackIDGenerator - btn;

$(document).ready(function () {
  $("#AutoTrackIDGenerator-btn").on("click", function (e) {
    console.log(`click hoise index`);
    updateStatus();
    setValid_Invalid_Status();
    calculateStatusInfo();
  });
});

$(document).ready(function () {
  $("#TrackIDValidationCheck-btn").on("click", function (e) {
    console.log(`click hoise validation`);
    $("#csvRoot tr").each(function (index) {
      console.log(`click hoise index ${index}`);
      console.log($(this).find("td:nth-child(3)").text());
      if (checkValidation($(this).find("td:nth-child(3)").text()) == "true") {
        console.log(`Valid`);
        $(this).find("td:nth-child(2)").html(`Valid`);
      } else if (
        checkValidation($(this).find("td:nth-child(3)").text()) == "false"
      ) {
        console.log(`Invalid`);
        $(this).find("td:nth-child(2)").html(`Invalid`);
      } else if (
        checkValidation($(this).find("td:nth-child(3)").text()) == "failed"
      ) {
        console.log(`Failed`);
        $(this).find("td:nth-child(2)").html(`Validation Failed`);
        //$(this).find("td:nth-child(3)").html(autoTrackIDGenerator());
      }
    });

    //updateStatus();
    //checkValidation();
    calculateStatusInfo();
  });
});
