// config: {field, locale}
function Datepicker(config) {
    this._config = config;
    this._element;
    this._date;

    var locale = config.locale || 'UK';

    if(!this._config.locale) {
    	this._config.locale = locale;
    }

    this._locale = datepickerLocale[locale];
    
    this._create();
}


/*
    Tool to convert to a local format (public)
*/
Datepicker.tools = {
    convertToLocalFormat: function(date, locale) {
        var dateFormat =  datepickerLocale[locale].dateFormat;

        return dateFormat
            .replace('yyyy', date.year)
            .replace('mm', date.month)
            .replace('dd', date.day)
    },
    convertToObject: function(input, locale) {
        var dateFormat = datepickerLocale[locale].dateFormat.replace(/\-/g, '/').replace(/\./g, '/').split('/');
        var dateInput = input.replace(/\-/g, '/').replace(/\./g, '/').split('/');
        var n = dateFormat.length;
        var dateAsObject = {};

        for(var i = 0; i < n; i++) {
            if(dateFormat[i] === 'yyyy') {
                dateAsObject.year = dateInput[i];
            }
            else if (dateFormat[i] === 'mm') {
                dateAsObject.month = dateInput[i];
            }
            else {
                dateAsObject.day = dateInput[i];
            }
        }

        var date = new Date(dateAsObject.year, dateAsObject.month - 1, dateAsObject.day);

        // validate
        if((date.getFullYear().toString() == dateAsObject.year) && (date.getMonth().toString() == (dateAsObject.month - 1).toString()) && (date.getDate().toString() == dateAsObject.day)) {
            valid = true;
        }
        else {
            valid = false;
        }

        if(valid) {
            return dateAsObject;
        }
        else {
            return false;
        }
    },
    convertToIsoFormat: function(date, locale) {
        if(!date) {
            return false;
        }

        if(date.month.length < 2) {
            date.month = '0' + date.month;
        }

        if(date.day.length < 2) {
            date.day = '0' + date.day;
        }

        return date.year + '-' + date.month + '-' + date.day;
    }
}


/*
    Show (public method)
*/
Datepicker.prototype.show = function() {
    var self = this;

    // do the onShow callback
    if(typeof(self._config.onShow) === 'function') {
        self._config.onShow();
    }

    self._element.fadeIn();

    return self;
}

/*
    Hide (public method)
*/
Datepicker.prototype.hide = function() {
    var self = this;

    self._element.stop().hide();

    return self;
}


/*
    Add the datepicker to the document
*/
Datepicker.prototype._create = function() {
    var self = this;

    // add the datepicker div if it's not already there
    var field = $(self._config.field);

    if(!field.hasClass('has-datepicker')) {
        self._element = $(htmlTemplate.calendarBody).insertAfter(field);
        field.addClass('has-datepicker');

        // get the date from the field ans set it up
        self._input(field.val());

        // hide the datepicker
        self._element.hide();

        // show the datepicker when clicked or focused on the field
        field.unbind().bind('click, focus', function() {
            self._input(field.val()).show();
        });

        // hide the datepicker when the date is changed
        field.keydown(
            function() {
                self.hide()
            }
        );

        // hide the datepicker when clicked outside of it
        $(document).mousedown(
            function() {
                self.hide();
            }
        );
    }

    return self;
};


/*
    Set the datepicker's internal date
*/
Datepicker.prototype._setDate = function(d) {
    var self = this;

    // keep the date in an attribute
    self._dateObject = d;

    var date = self._dateObject;

    // set the date as today's date
    self._date = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        weekday: date.getDay()
    };

    return self;
}


/*
    Get a string like "mm/dd/yy" as an input
*/
Datepicker.prototype._input = function(input) {
    var self = this;

    var valid = true;

    // if there is an input set the internal date as the input mentions
    if(input) {
        var dateAsObject = Datepicker.tools.convertToObject(input, self._config.locale);

        var date = new Date(dateAsObject.year, dateAsObject.month - 1, dateAsObject.day);

        if(dateAsObject) {
            self._setDate(date);
        }
        else {
            self._setDate(new Date());  
        }
    }

    self._setup()._addEvents();

    // hightlight the selected day
    if(valid) {
        $('.datepicker-days-day').each(
            function() {
                if(this.innerHTML == dateAsObject.day) {
                    $(this).addClass('selected');
                }
            }
        );
    }

    return self;
}


/*
    Output the internal date in the local format and eventually change the value of the field
*/
Datepicker.prototype._output = function() {
    var self = this;

    var dateFormat = self._locale.dateFormat;

    // remember the output in the __output attribute
    self.__output = dateFormat
        .replace('yyyy', self._date.year)
        .replace('mm', self._date.month)
        .replace('dd', self._date.day);

    // set the value of the field
    self._config.field.val(self.__output);

    // fade the datepicker out
    self._element.stop().fadeOut();

    return self;
}


/* 
    Check if a date is today
*/
Datepicker.prototype._isToday = function(day) {
    var self = this;

    var date = new Date();

    var actualTime = {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
    }

    if(day === actualTime.day && self._date.month === actualTime.month && self._date.year === actualTime.year) {
        return true;    
    }

    return false;
}


/*
    Check if a day is selected
*/
Datepicker.prototype._isSelected = function(day) {
    var self = this;

    if(day === self._date.day) {
        return true;
    }

    return false;
}


/*
    Show the initial data
*/
Datepicker.prototype._setup = function() {
    var self = this;

    // set the date
    self._setDate(self._dateObject || new Date());

    var date = self._dateObject;

    // show the month
    $('.datepicker-month-title-month', self._element).html(self._locale.months[self._date.month]);

    // show the year
    $('.datepicker-month-title-year input', self._element).val(self._date.year);

    // show the days of the week
    var html = '';
    var firstDayOfWeek = self._locale.firstDayOfWeek;
    var d = firstDayOfWeek;

    for(var i = 1; i <= 7; i++) {
        html += htmlTemplate['weekdayBody'].replace('{{item}}', self._locale.daysMin[d]);

        if(d < 7) {
            d++;
        }
        else {
            d = 1;
        }
    }

    $('.datepicker-weekdays', self._element).html(html);

    // show the days of the month
    html = '';
    var firstDayOfMonth = new Date(date.setDate(1)).getDay() + 1;
    d = firstDayOfWeek;

    if(firstDayOfMonth >= firstDayOfWeek) {
        for(var i = 1; i <= firstDayOfMonth - firstDayOfWeek; i++) {
            html += htmlTemplate['dayBody_empty'];
        }
    }
    else {
        for(var i = firstDayOfWeek - firstDayOfMonth; i < 7; i++) {
            html += htmlTemplate['dayBody_empty'];
        }
    }

    var totalDaysInMonth = new Date(self._date.year, self._date.month, 0).getDate();

    for(var i = 1; i <= totalDaysInMonth; i++) {
        if(!self._isToday(i)) {
            html += htmlTemplate['dayBody'].replace('{{item}}', i);
        }
        else {
            html += htmlTemplate['dayBody_today'].replace('{{item}}', i);
        }
    }

    $('.datepicker-days').html(html);

    return self;
};


/*
    Add events
*/
Datepicker.prototype._addEvents = function() {
    var self = this;

    // prev month button
    $('.datepicker-prev', self._element).unbind().click(
        function() {
            self._changeMonth('prev');
        }
    );

    // next month button
    $('.datepicker-next', self._element).unbind().click(
        function() {
            self._changeMonth('next');
        }
    );

    // year
    $('.datepicker-month-title-year input', self._element).keyup(function() {
        if($(this).val() > 999 && $(this).val() < 10000 && $(this).val() > 0) {
            self._changeYear($(this).val());
            $('.datepicker-days', self._element).show();
        }
        else {
            $('.datepicker-days', self._element).hide();
        }
    });

    // day
    $('.datepicker-days-day').unbind().click(
        function() {
            $('.selected', self._element).removeClass('selected');
            var e = $(this);
            e.addClass('selected');
            self._changeDay(e.html());
        }
    );

    // don't hide the datepicker when clicking on it
    $(self._element).unbind().mousedown(
        function(e) {
            e.stopPropagation();
        }
    );

    return self;
}

/*
    Change year
*/
Datepicker.prototype._changeYear = function(year) {
    var self = this;

    self._dateObject.setDate(1);
    self._dateObject.setFullYear(year);

    self._setup();
    self._addEvents();

    return self;
}

/*
    Change month
*/
Datepicker.prototype._changeMonth = function(month, year) {
    var self = this;

    if(month === 'prev') {
        self._dateObject.setDate(1);
        self._dateObject.setMonth(self._date.month - 2);

        self._setup();
    }
    else if(month === 'next') {
        self._dateObject.setDate(1);
        self._dateObject.setMonth(self._date.month);

        self._setup();
    }

    self._addEvents();

    return self;
}


/*
    Change day
*/
Datepicker.prototype._changeDay = function(day) {
    var self = this;

    self._dateObject.setDate(day);
    self._setDate(self._dateObject);

    self._addEvents()._output();

    return self;
}
