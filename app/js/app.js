var template = null;

var setTemplate = function (templateName) {
	var source = $("#" + templateName + "-template").html();
	return Handlebars.compile(source);
}

var getDomain = function (divisionName) {
	var domains = {
		group: "@artificialgroup.com",
		boutique: "@artificialgroup.com",
		digital: "@artificialdigital.com",
	};
	if (domains[divisionName]) {
		return domains[divisionName]
	} else {
		return null;

	}

}

var setDivision = function (divisionName) {
	$('#email-postfix').html(getDomain(divisionName));
	console.log(getDomain(divisionName));
}

var updateTemplate = function () {
	var formData = {};

	var myForm = document.getElementById("employee-data");
	for (var i = 0; i < myForm.elements.length; i++) {
		formData[myForm.elements[i].name] = myForm.elements[i].value;
	}
	pData = processFormData(formData);

	setDivision(pData.division);
	template = setTemplate(pData.division);
	var html = template(pData.context);
	window.requestAnimationFrame(function(){
		$('#target').html(html);
	});
}

var processFormData =  function (data) {
console.log(data);
	var ctxt = {};
	ctxt.name = data.name;
	ctxt.position = data.position;
	ctxt.email = data.email + '@artificialgroup.com';
	ctxt.phone = '+36 ' + data.phone;
	return {
		context: ctxt,
		division: data.division
	}
};


$(document).foundation();

updateTemplate();


$('input').on('keyup', function() {
	updateTemplate();
});

$("#division-select").on('change', function() {
	setDivision(this.value);
	updateTemplate();
});

console.log( $("#employee-data>[name='division']"));
