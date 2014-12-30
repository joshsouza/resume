
/*
	Functions for alphabetizing a list (ul or ol)
*/
function alphabetize(items){
		var a;
		for(var i=0;i<items.length;i++){
			sortList(items[i]);
		}
	}
/* Some of this sorting thanks to: http://www.webdeveloper.com/forum/showthread.php?172489-Javascript-to-sort-li-s
*/
function childrenToTextArray(element) {
	var contents= [];
	var nextNode, nType, parent, i;
	if (!element) return contents;
	if (element.nodeType== 3 && /\w+/.test(element.data)) contents.push(element);
	else if (element.hasChildNodes()){
		parent= element.childNodes, i= 0;
		while (parent[i]){
			nextNode= parent[i++];
			nType= nextNode.nodeType;
			if (nType== 3) {
				if (/\w+/.test(nextNode.data)) contents.push(nextNode);
			}
			else if (nType== 1) contents=contents.concat(arguments.callee(nextNode));
		}
	}
	return contents;
}

	function sortList(element){
		var text=childrenToTextArray(element);
		text.sort(function(a,b){
			a= a.data.toLowerCase().replace(/^ */g,'');
			b= b.data.toLowerCase().replace(/^ */g,'');
			if(a==b)return 0;
			return a>b?1:-1;
		})
		while(text.length){
			var h=text.pop();
			while(h && h.nodeName!='LI') h=h.parentNode;
			if(h) element.insertBefore(h,element.firstChild);
		}
	}



/*
	Function for keeping dates up to date whenever you load the page
*/
function updateTimeframe(field,dateString,secondDate) {
	var f=document.getElementById(field);var now = new Date();
	var now = new Date();
	if(typeof(secondDate) != "undefined"){now=new Date(secondDate);}
	var today = new Date(now.getYear(),now.getMonth(),now.getDate());
	var yearNow = now.getYear();
	var monthNow = now.getMonth();
	var dateNow = now.getDate();

	var dob = new Date(dateString);

	var yearDob = dob.getYear();
	var monthDob = dob.getMonth();
	var dateDob = dob.getDate();
	var age = {};
	var ageString = "";
	var yearString = "";
	var monthString = "";
	var dayString = "";
	
	yearAge = yearNow - yearDob;

	if (monthNow >= monthDob){
		var monthAge = monthNow - monthDob;
	} else {
		yearAge--;
		var monthAge = 12 + monthNow -monthDob;
	}
	if (dateNow >= dateDob){
		var dateAge = dateNow - dateDob;
	} else {
		monthAge--;
		var dateAge = 31 + dateNow - dateDob;
		if (monthAge < 0) {
			monthAge = 11;
			yearAge--;
		}
	}
	age = {
		years: yearAge,
		months: monthAge,
		days: dateAge
	};
	if(age.days > 10){
		age.months+=1;
	}
	age.days=0;

	if ( age.years > 1 ) yearString = " years";
	else yearString = " year";
	if ( age.months> 1 ) monthString = " months";
	else monthString = " month";
	if ( age.days > 1 ) dayString = " days";
	else dayString = " day";


	if ( (age.years > 0) && (age.months > 0) && (age.days > 0) )
	ageString = age.years + yearString + " " + age.months + monthString;//+ ", and " + age.days + dayString + " old.";
	/*else if ( (age.years == 0) && (age.months == 0) && (age.days > 0) )
	ageString = age.days + dayString;
	*/
	else if ( (age.years > 0) && (age.months == 0) && (age.days == 0) )
	ageString = age.years + yearString;
	else if ( (age.years > 0) && (age.months > 0) && (age.days == 0) )
	ageString = age.years + yearString + " " + age.months + monthString;
	else if ( (age.years == 0) && (age.months > 0) && (age.days > 0) )
	ageString = age.months + monthString;
	else if ( (age.years > 0) && (age.months == 0) && (age.days > 0) )
	ageString = age.years + yearString;
	else if ( (age.years == 0) && (age.months > 0) && (age.days == 0) )
	ageString = age.months + monthString;
	else ageString = "Could not calculate!";

	f.innerHTML=ageString;
	return ageString;

}