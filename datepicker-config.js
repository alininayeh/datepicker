// The html for the datepicker
var htmlTemplate = {
	calendarBody:   '<div class="simple-datepicker">' + 
						'<div class="datepicker-month">' +
							'<span class="datepicker-prev">&#x25C0;</span>' +
							'<span class="datepicker-month-title">' +
								'<span class="datepicker-month-title-month"></span>' +
								'&nbsp;' +
								'<span class="datepicker-month-title-year"></span>' +
							'</span>' +
							'<span class="datepicker-next">&#x25B6;</span>' +
							'<div class="datepicker-clear"></div>' +
						'</div>' +
						'<div class="datepicker-weekdays"></div>' +
						'<div class="datepicker-days"></div>' +
					'</div>',
	weekdayBody:    '<span class="datepicker-weekdays-day">{{item}}</span>',
	dayBody:        '<span class="datepicker-days-day">{{item}}</span>',
	dayBody_empty:  '<span class="datepicker-days-other-month"></span>',
	dayBody_today:  '<span class="datepicker-days-day datepicker-today">{{item}}</span>'
}


// The locale settings
var datepickerLocale = {
	// USA
	"US": {
	    "months": [
	    	"--- leave me empty ---",
	        "January",
	        "February",
	        "March",
	        "April",
	        "May",
	        "June",
			"July",
	        "August",
	        "September",
	        "October",
	        "November",
	        "December"
	    ],
	    "days": [
	    	"--- leave me empty ---",
	    	"Sunday",
	        "Monday",
	        "Tuesday",
	        "Wednesday",
	        "Thursday",
	        "Friday",
	        "Saturday"
	    ],
	    "daysMin": ["--- leave me empty ---","Su","Mo","Tu","We","Th","Fr","Sa"],
	    "dateFormat": "mm/dd/yyyy",
	    "firstDayOfWeek": 1
	},
	// UK
	"UK": {
	    "months": [
	    	"--- leave me empty ---",
	        "January",
	        "February",
	        "March",
	        "April",
	        "May",
	        "June",
			"July",
	        "August",
	        "September",
	        "October",
	        "November",
	        "December"
	    ],
	    "days": [
	    	"--- leave me empty ---",
	    	"Sunday",
	        "Monday",
	        "Tuesday",
	        "Wednesday",
	        "Thursday",
	        "Friday",
	        "Saturday"
	    ],
	    "daysMin": ["--- leave me empty ---","Su","Mo","Tu","We","Th","Fr","Sa"],
	    "dateFormat": "dd/mm/yyyy",
	    "firstDayOfWeek": 2
	},
	// Romania
	"RO": {
	    "months": [
	    	"--- leave me empty ---",
	        "January",
	        "February",
	        "March",
	        "April",
	        "May",
	        "June",
			"July",
	        "August",
	        "September",
	        "October",
	        "November",
	        "December"
	    ],
	    "days": [
	    	"--- leave me empty ---",
	    	"Sunday",
	        "Monday",
	        "Tuesday",
	        "Wednesday",
	        "Thursday",
	        "Friday",
	        "Saturday"
	    ],
	    "daysMin": ["--- leave me empty ---","Su","Mo","Tu","We","Th","Fr","Sa"],
	    "dateFormat": "dd/mm/yyyy",
	    "firstDayOfWeek": 1
	}
}

var datepickerConfigLoaded = true;