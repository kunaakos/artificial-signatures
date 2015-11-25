var template = null,
		currentDivision = null;

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

		// change template based on current division, render template
		renderTemplate = function (pData) {
			setDivision(pData.division);
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
			ctxt.position = formData.position;
			ctxt.siteUrl = getDomainName(formData.division);
			ctxt.divisionName = getDivisionName(formData.division);
			ctxt.divisionID = formData.division;
			ctxt.phone = formData.phone ? '+36 ' + formData.phone : null;
			return {
				context: ctxt,
				division: formData.division
			}
		},

		// http://stackoverflow.com/a/22085875
		downloadSignatureHtml = function (filename, elId, mimeType) {
	    var elHtml = $(elId).html();
	    var link = document.createElement('a');
	    mimeType = mimeType || 'text/plain';
	    link.setAttribute('download', filename);
	    link.setAttribute('href', 'data:' + mimeType  +  ';charset=utf-8,' + encodeURIComponent(elHtml));
	    link.click();
		};

// start
$(document).foundation();
updateForm();

// refresh template after every keystroke
$('input').on('keyup', function() {
	updateForm();
});

// save sig
$('#btn-save').on('click', function() {
	downloadSignatureHtml('signature.html', '#target', 'text/html');
});

// change template, email, etc. after a new division is selected
$("#division-select").on('change', function() {
	setDivision(this.value);
	updateForm();
});
