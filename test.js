$(document).ready(function () {
  console.log("ready!");
  $("button#post_add_jichitai_codes_Button").click(function () {
    calculateStatusInfo();
  });
});
// //////////////////////////////////
// console.log(`click hoise index ${index}`);
// console.log($(this).find("td:nth-child(3)").text());
// if (checkValidation($(this).find("td:nth-child(3)").text()) == "true") {
//   console.log(`Valid`);
//   $(this).find("td:nth-child(2)").html(`Valid`);
// } else if (checkValidation($(this).find("td:nth-child(3)").text()) == "false") {
//   console.log(`Invalid`);
//   $(this).find("td:nth-child(2)").html(`Invalid`);
// } else if (
//   checkValidation($(this).find("td:nth-child(3)").text()) == "failed"
// ) {
//   console.log(`Failed`);
//   $(this).find("td:nth-child(2)").html(`Validation Failed`);
//   //$(this).find("td:nth-child(3)").html(autoTrackIDGenerator());
// }
///////////////////////////////////
