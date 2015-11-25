var template = null,
		currentDivision = null,
		userName = null;

var domainNames = {
			boutique: "www.artificialgroup.com",
			craft: "www.artificialgroup.com",
			event: "www.artificialevent.com",
			digital: "www.artificialdigital.com",
		};

var divisionNames = {
			boutique: "Boutique Creative",
			craft: "Craft Division",
			event: "Event Division",
			digital: "Digital Division",
		};

var divisionColors = {
			boutique: "#149c86",
			craft: "#d17f24",
			event: "#3a7fb6",
			digital: "#da5340",
		};

var setTemplate = function (templateName) {
			var source = $("#template").html();
			return Handlebars.compile(source);
		},

		getDomainName = function (divisionName) {
			if (domainNames[divisionName]) {
				return domainNames[divisionName]
			} else {
				return null;
			}
		},

		getDivisionName = function (divisionName) {
			if (divisionNames[divisionName]) {
				return divisionNames[divisionName]
			} else {
				return null;
			}
		},

		getDivisionColor = function (divisionName) {
			if (divisionColors[divisionName]) {
				return divisionColors[divisionName]
			} else {
				return null;
			}
		}

		setDivision = function (divisionName) {
			$('#email-postfix').html(getDomainName(divisionName));
			currentDivision = divisionName;
		},

		// does everything, basically
		updateForm = function () {
			var pData = processFormData(getFormData());
			renderTemplate(pData);
		},

		// gather data from form, change division if needed, render template
		getFormData = function () {
			var formData = {};
			var myForm = document.getElementById("employee-data");
			for (var i = 0; i < myForm.elements.length; i++) {
				formData[myForm.elements[i].name] = myForm.elements[i].value;
			}
			return formData;
		},

		setFormColor = function (color) {
			$('.chameleon').css('background-color', color);
		}


		// change template based on current division, render template
		renderTemplate = function (pData) {
			setDivision(pData.division);
			setFormColor(getDivisionColor(pData.division));
			template = setTemplate(pData.division);
			var html = template(pData.context);
			window.requestAnimationFrame(function(){
				$('#target').html(html);
			});
		},

		// process and eventually validate form, return division name and context data for handlebars
		processFormData =  function (formData) {
			var ctxt = {};
			ctxt.name = formData.name;
			userName = formData.name;
			ctxt.position = formData.position;
			ctxt.siteUrl = getDomainName(formData.division);
			ctxt.divisionName = getDivisionName(formData.division);
			ctxt.divisionID = formData.division;
			ctxt.divisionColor = getDivisionColor(formData.division);
			ctxt.phone = (formData.phone && formData.phone != '           ') ? formData.phone : null;
			console.log('|' + ctxt.phone + '|');
			return {
				context: ctxt,
				division: formData.division
			}
		},

		// http://stackoverflow.com/a/22085875
		downloadSignatureHtml = function (filename) {
	    var elHtml = $('#target').html();
	    var link = document.createElement('a');
	    link.setAttribute('download', filename);
	    link.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(elHtml));
	    link.click();
		};

// start
$("#title").fitText(1.3);
$("#phone-input").mask("99 999 9999",{placeholder:" ", autoclear: false});
$(document).foundation();
updateForm();

// refresh template after every keystroke
$('input').on('keyup', function() {
	updateForm();
});

// save sig
$('#btn-save').on('click', function() {
	if (userName) {
		var today = new Date();
		downloadSignatureHtml(userName.replace(/\s+/g, '') +'-sig-' + today.getDate() + '_' + (today.getMonth() + 1) + '_' + today.getFullYear() + '.html');
	} else {
		alert('Ne felejtsd el kitölteni!');
	}
});

// change template, email, etc. after a new division is selected
$("#division-select").on('change', function() {
	setDivision(this.value);
	updateForm();
});

// $("#phone-input").on('keyup', function() {
// 	var number = $(this).val();
//   number = number.replace(/\s+/g, '').replace(/(\d{2})(\d{3})(\d{4})/, "$1 $2 $3");
//   $(this).val(number);
// 	updateForm();
// });
