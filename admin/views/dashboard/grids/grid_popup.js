$(function() {
    // 年龄
    numericRange($('#ageStart'), $('#ageEnd'), 'n0', 0, 1, 1, 100);
    // 身高
    numericRange($('#heightStart'), $('#heightEnd'), '0.00 m', 2, 0.01, 0.30, 3.00);
    // 血型
    $('#bloodType').kendoDropDownList();
    // 生日
    dateRange($('#birthdayStart'), $('#birthdayEnd'), 'Date');
    // 配偶生日
    dateInputRange($('#mateBirthdayStart'), $('#mateBirthdayEnd'), 'Date');
    // 银行卡
    $('#creditCard').kendoMaskedTextBox({
        mask: '0000 0000 0000 0000'
    });
    // 资产
    numericRange($('#assetStart'), $('#assetEnd'), 'c', 2, 10000, 0, 10000000000);
    // 籍贯
    $('#province').kendoDropDownList({
        dataSource: {
            transport: {
                read: function(options) {
                    $.fn.ajaxPost({
                        ajaxUrl: 'json/province.json',
                        succeed: function(res) {
                            options.success(res);
                        },
                        failed: function(res) {
                            options.error(res);
                        }
                    });
                }
            },
            schema: {
                data: 'data'
            }
        },
        optionLabel: '-= 省份 =-',
        dataValueField: 'province',
        dataTextField: 'provinceName'
    });
    $('#city').kendoDropDownList({
        dataSource: {
            transport: {
                read: function(options) {
                    $.fn.ajaxPost({
                        ajaxUrl: 'json/city.json',
                        succeed: function(res) {
                            options.success(res);
                        },
                        failed: function(res) {
                            options.error(res);
                        }
                    });
                }
            },
            schema: {
                data: 'data'
            }
        },
        autoBind: false,
        cascadeFrom: 'province',
        optionLabel: '-= 城市 =-',
        dataValueField: 'city',
        dataTextField: 'cityName'
    });
    $('#area').kendoDropDownList({
        dataSource: {
            transport: {
                read: function(options) {
                    $.fn.ajaxPost({
                        ajaxUrl: 'json/area.json',
                        succeed: function(res) {
                            options.success(res);
                        },
                        failed: function(res) {
                            options.error(res);
                        }
                    });
                }
            },
            schema: {
                data: 'data'
            }
        },
        autoBind: false,
        cascadeFrom: 'city',
        optionLabel: '-= 区县 =-',
        dataValueField: 'area',
        dataTextField: 'areaName'
    });
    // 居住地
    $('#domicile').kendoDropDownTree({
        dataSource: {
            transport: {
                read: function(options) {
                    $.fn.ajaxPost({
                        ajaxUrl: 'json/select_hierarchical_data.json',
                        succeed: function(res) {
                            options.success(res);
                        },
                        failed: function(res) {
                            options.error(res);
                        }
                    });
                }
            },
            schema: {
                data: 'data',
                model: {
                    children: 'items'
                }
            }
        },
        placeholder: '树形下拉框',
        dataValueField: 'code',
        dataTextField: 'name'
    });
    // 民族
    $('#nation').kendoComboBox({
        dataSource: {
            transport: {
                read: function(options) {
                    $.fn.ajaxPost({
                        ajaxUrl: 'json/nation.json',
                        succeed: function(res) {
                            options.success(res);
                        },
                        failed: function(res) {
                            options.error(res);
                        }
                    });
                }
            },
            schema: {
                data: 'data'
            }
        },
        dataValueField: 'nation',
        dataTextField: 'nationName',
        suggest: true
    });
    // 生肖
    $('#zodiac').kendoMultiColumnComboBox({
        dataSource: {
            transport: {
                read: function(options) {
                    $.fn.ajaxPost({
                        ajaxUrl: 'json/zodiac.json',
                        succeed: function(res) {
                            options.success(res);
                        },
                        failed: function(res) {
                            options.error(res);
                        }
                    });
                }
            },
            schema: {
                data: 'data'
            }
        },
        dataValueField: 'zodiac',
        dataTextField: 'zodiacName',
        columns: [
            { field: 'zodiacName', title: '生肖', width: '56px' },
            { field: 'zodiacValue1', title: '年份', width: '60px' },
            { field: 'zodiacValue2', title: '年份', width: '60px' },
            { field: 'zodiacValue3', title: '年份', width: '60px' },
            { field: 'zodiacValue4', title: '年份', width: '60px' },
            { field: 'zodiacValue5', title: '年份', width: '60px' }
        ],
        filter: 'contains',
        filterFields: ['zodiacValue1', 'zodiacValue2', 'zodiacValue3', 'zodiacValue4', 'zodiacValue5'],
        minLength: 4,
        suggest: true
    });
    // 语言
    $('#language').kendoAutoComplete({
        dataSource: {
            transport: {
                read: function(options) {
                    $.fn.ajaxPost({
                        ajaxUrl: 'json/language.json',
                        succeed: function(res) {
                            options.success(res);
                        },
                        failed: function(res) {
                            options.error(res);
                        }
                    });
                }
            },
            schema: {
                data: 'data'
            }
        },
        dataTextField: 'language',
        suggest: true,
        separator: ' '
    });
    // 毕业年份
    dateRange($('#graduationStart'), $('#graduationEnd'), 'Year');
    // 参加工作年月
    dateRange($('#firstJobStart'), $('#firstJobEnd'), 'Month');
    // 起床时间
    dateRange($('#getUpStart'), $('#getUpEnd'), 'Time');
    // 最有意义的时刻
    dateRange($('#importantMomentStart'), $('#importantMomentEnd'), 'DateTime');
    // 性格
    $('#character').kendoSlider({
        decreaseButtonTitle: '内向',
        increaseButtonTitle: '开朗',
        min: -10,
        max: 10,
        smallStep: 2,
        largeStep: 1,
        tooltip: {
            template: '# if(value==10){ #超级开朗# }else if(value==8){ #非常开朗# }else if(value==6){ #很开朗# }else if(value==4){ #比较开朗# }else if(value==2){ #有点开朗# }else if(value==-2){ #有点内向# }else if(value==-4){ #比较内向# }else if(value==-6){ #很内向# }else if(value==-8){ #非常内向# }else if(value==-10){ #超级内向# }else{ #普通# } #'
        }
    });
    // 颜色喜好
    $('#color').kendoColorPicker({
        opacity: true,
        buttons: false
    });
    // 相配的星座
    $('#constellation').kendoMultiSelect({
        placeholder: '多选下拉框',
        autoClose: false
    });
    // 是否在线
    $('#online').kendoMobileSwitch({
        onLabel: '',
        offLabel: '',
        checked: true
    });
    // 获取数据源生成表格
    $('#grid').kendoGrid({
        dataSource: {
            transport: {
                create: function(options) { createGrid(options, 'json/response.json') },
                destroy: function(options) { destroyGrid(options, 'json/response.json') },
                update: function(options) { updateGrid(options, 'json/response.json') },
                read: function(options) { readGrid(options, 'json/grid.json') }
            },
            schema: {
                total: 'total',
                data: 'data',
                model: {
                    id: 'id',
                    fields: {
                        userName: { type: 'string' },
                        realName: { type: 'string' },
                        nickName: { type: 'string' },
                        password: { type: 'string' },
                        confirmPassword: { type: 'string' },
                        online: { type: 'boolean' },
                        gender: { type: 'string' },
                        age: { type: 'number',
                            defaultValue: null
                        },
                        height: { type: 'number',
                            defaultValue: null
                        },
                        bloodType: { type: 'string' },
                        birthday: { type: 'date',
                            defaultValue: null,
                            parse: function(e) {
                                return kendo.toString(kendo.parseDate(e), 'yyyy-MM-dd');
                            }
                        },
                        mateBirthday: { type: 'date',
                            defaultValue: null,
                            parse: function(e) {
                                return kendo.toString(kendo.parseDate(e), 'yyyy-MM-dd');
                            }
                        },
                        creditCard: { type: 'string',
                            parse: function(e) {
                                return e.replace(/\s*/g, '');
                            }
                        },
                        asset: { type: 'number',
                            defaultValue: null
                        },
                        nativePlace: { type: 'object',
                            defaultValue: {
                                province: '',
                                provinceName: '',
                                city: '',
                                cityName: '',
                                area: '',
                                areaName: ''
                            }
                        },
                        domicile: { type: 'object',
                            defaultValue: {
                                code: '',
                                name: ''
                            },
                            parse: function(e) {
                                delete e.expanded;
                                delete e.id;
                                delete e.index;
                                delete e.items;
                                delete e.selected;
                                delete e._level;
                                return e;
                            }
                        },
                        nation: { type: 'object',
                            defaultValue: {
                                nation: '',
                                nationName: ''
                            }
                        },
                        zodiac: { type: 'object',
                            defaultValue: {
                                zodiac: '',
                                zodiacName: ''
                            },
                            parse: function(e) {
                                delete e.zodiacValue1;
                                delete e.zodiacValue2;
                                delete e.zodiacValue3;
                                delete e.zodiacValue4;
                                delete e.zodiacValue5;
                                return e;
                            }
                        },
                        language: { type: 'string',
                            parse: function(e) {
                                return $.trim(e);
                            }
                        },
                        education: { type: 'object',
                            defaultValue: []
                        },
                        graduation: { type: 'date',
                            defaultValue: null,
                            parse: function(e) {
                                return kendo.toString(new Date(e), 'yyyy');
                            }
                        },
                        firstJob: { type: 'date',
                            defaultValue: null,
                            parse: function(e) {
                                return kendo.toString(new Date(e), 'yyyy-MM');
                            }
                        },
                        mobile: { type: 'string' },
                        email: { type: 'string' },
                        homepage: { type: 'string' },
                        getUp: { type: 'date',
                            defaultValue: null,
                            parse: function(e) {
                                return kendo.toString(kendo.parseDate(e), 'HH:mm');
                            }
                        },
                        importantMoment: { type: 'date',
                            defaultValue: null,
                            parse: function(e) {
                                return kendo.toString(kendo.parseDate(e), 'yyyy-MM-dd HH:mm');
                            }
                        },
                        character: { type: 'number' },
                        color: {
                            defaultValue: 'rgba(0, 0, 0, 0)',
                            parse: function(e) {
                                return 'rgba('+ kendo.parseColor(e).r +', '+ kendo.parseColor(e).g +', '+ kendo.parseColor(e).b +', '+ kendo.parseColor(e).a +')';
                            }
                        },
                        constellation: { type: 'object',
                            defaultValue: []
                        },
                        summary: { type: 'string' },
                        photo: { type: 'object',
                            defaultValue: {
                                url: 'img/avatar.png',
                                name: 'avatar',
                                extension: '.png',
                                size: 53284
                            }
                        },
                        sign: { type: 'string' }
                    }
                }
            },
            //serverPaging: true,
            pageSize: 10
        },
        toolbar: [
            { name: 'create', text: '新增' }
        ],
        columns: [
            { locked: true, title: '操作', width: '230px',
                command: [
                    { name: 'detail', text: '详情',
                        iconClass: 'k-icon k-i-txt',
                        click: function(e) {
                            e.preventDefault();
                            divWindow('详情', 'auto', '40%', kendo.template($('#detailsTemplate').html())(this.dataItem($(e.target).closest('tr'))));
                        }
                    },
                    { name: 'edit',
                        iconClass: {
                            edit: 'k-icon k-i-edit',
                            update: 'k-icon k-i-check',
                            cancel: 'k-icon k-i-cancel'
                        },
                        text: {
                            update: '保存'
                        }
                    },
                    { name: 'destroy',
                        iconClass: 'k-icon k-i-x'
                    }
                ]
            },
            { field: 'userName', title: '用户名', width: '80px' },
            { field: 'realName', title: '姓名', width: '100px' },
            { field: 'nickName', title: '昵称', width: '110px' },
            { hidden: true, field: 'password', title: '密码', width: '70px',
                template: function(dataItem) {
                    return dataItem.password.replace(dataItem.password.substr(0), '******');
                },
                editor: function(container, options) {
                    $('<input class="k-textbox" type="password" data-bind="value: '+ options.field +'">')
                        .appendTo(container);
                }
            },
            { field: 'online', title: '状态', width: '70px',
                template:
                    '# if (online) { #' +
                        '<span class="d-inline-block border border-success rounded-circle k-notification-success" style="width: 10px; height: 10px;"></span><span class="k-notification-success bg-transparent ml-2">在线</span>' +
                    '# } else { #' +
                        '<span class="d-inline-block border border-danger rounded-circle k-notification-error" style="width: 10px; height: 10px;"></span><span class="k-notification-error bg-transparent ml-2">离线</span>' +
                    '# } #',
                editor: function(container, options) {
                    $('<input type="checkbox" data-bind="value: '+ options.field +'">')
                        .appendTo(container)
                        .kendoMobileSwitch({
                            onLabel: '',
                            offLabel: ''
                        });
                }
            },
            { field: 'gender', title: '性别', width: '60px',
                values: [
                    { text: '男', value: '1' },
                    { text: '女', value: '2' }
                ],
                editor: function(container, options) {
                    $('<input class="k-radio" id="genderEdit1" type="radio" value="1" data-bind="checked: '+ options.field +'"><label class="k-radio-label" for="genderEdit1">男</label>' +
                        '<input class="k-radio" id="genderEdit2" type="radio" value="2" data-bind="checked: '+ options.field +'"><label class="k-radio-label" for="genderEdit2">女</label>')
                        .appendTo(container);
                }
            },
            { field: 'age', title: '年龄', width: '70px',
                template: '#= age # 岁',
                editor: function(container, options) {
                    $('<input type="number" data-bind="value: '+ options.field +'">')
                        .appendTo(container)
                        .kendoNumericTextBox({
                            format: 'n0',
                            decimals: 0,
                            min: 1,
                            max: 100
                        });
                }
            },
            { field: 'height', title: '身高', width: '80px',
                template: '#= kendo.toString(height, "0.00") # m',
                editor: function(container, options) {
                    $('<input type="number" data-bind="value: '+ options.field +'">')
                        .appendTo(container)
                        .kendoNumericTextBox({
                            format: '0.00 m',
                            decimals: 2,
                            step: 0.01,
                            min: 0.30,
                            max: 3.00
                        });
                }
            },
            { field: 'bloodType', title: '血型', width: '70px',
                values: [
                    { text: 'A 型', value: '1' },
                    { text: 'B 型', value: '2' },
                    { text: 'O 型', value: '3' },
                    { text: 'AB 型', value: '4' },
                    { text: '其他', value: '5' }
                ],
                editor: function(container, options) {
                    $('<select data-bind="value: '+ options.field +'"></select>')
                        .appendTo(container)
                        .kendoDropDownList({
                            dataSource: {
                                data: [
                                    { text: 'A 型', value: '1' },
                                    { text: 'B 型', value: '2' },
                                    { text: 'O 型', value: '3' },
                                    { text: 'AB 型', value: '4' },
                                    { text: '其他', value: '5' }
                                ]
                            },
                            optionLabel: "-= 请选择 =-",
                            dataValueField: 'value',
                            dataTextField: 'text'
                        });
                }
            },
            { field: 'birthday', title: '生日', width: '110px',
                editor: function(container, options) {
                    $('<input type="date" data-bind="value: '+ options.field +'">')
                        .appendTo(container)
                        .kendoDatePicker({
                            format: 'yyyy-MM-dd',
                            footer: '今天：#= kendo.toString(data, "yyyy年MM月dd日") #',
                            min: new Date(1920, 0, 1),
                            max: new Date()
                        });
                }
            },
            { field: 'mateBirthday', title: '配偶生日', width: '110px',
                editor: function(container, options) {
                    $('<input type="date" data-bind="value: '+ options.field +'">')
                        .appendTo(container)
                        .kendoDateInput({
                            format: 'yyyy-MM-dd',
                            min: new Date(1920, 0, 1),
                            max: new Date()
                        });
                }
            },
            { field: 'creditCard', title: '银行卡', width: '150px',
                template: function(dataItem) {
                    return dataItem.creditCard.replace(dataItem.creditCard.substr(2, 12), '** **** **** **');
                },
                editor: function(container, options) {
                    $('<input data-bind="value: '+ options.field +'">')
                        .appendTo(container)
                        .kendoMaskedTextBox({
                            mask: '0000 0000 0000 0000'
                        });
                }
            },
            { field: 'asset', title: '资产', width: '140px',
                format: '{0:c}',
                editor: function(container, options) {
                    $('<input type="number" data-bind="value: '+ options.field +'">')
                        .appendTo(container)
                        .kendoNumericTextBox({
                            format: 'c',
                            decimals: 2,
                            step: 10000
                        });
                }
            },
            { field: 'nativePlace', title: '籍贯', width: '250px',
                template: '#= nativePlace.provinceName # - #= nativePlace.cityName # - #= nativePlace.areaName #',
                editor: function(container, options) {
                    $('<select class="mb-2" id="provinceEdit" data-bind="value: '+ options.field +'"></select>')
                        .appendTo(container)
                        .kendoDropDownList({
                            dataSource: {
                                transport: {
                                    read: function(options) {
                                        $.fn.ajaxPost({
                                            ajaxUrl: 'json/province.json',
                                            succeed: function(res) {
                                                options.success(res);
                                            },
                                            failed: function(res) {
                                                options.error(res);
                                            }
                                        });
                                    }
                                },
                                schema: {
                                    data: 'data'
                                }
                            },
                            optionLabel: '-= 省份 =-',
                            dataValueField: 'province',
                            dataTextField: 'provinceName'
                        });
                    $('<select class="mb-2" id="cityEdit" data-bind="value: '+ options.field +'"></select>')
                        .appendTo(container)
                        .kendoDropDownList({
                            dataSource: {
                                transport: {
                                    read: function(options) {
                                        $.fn.ajaxPost({
                                            ajaxUrl: 'json/city.json',
                                            succeed: function(res) {
                                                options.success(res);
                                            },
                                            failed: function(res) {
                                                options.error(res);
                                            }
                                        });
                                    }
                                },
                                schema: {
                                    data: 'data'
                                }
                            },
                            autoBind: false,
                            cascadeFrom: 'provinceEdit',
                            optionLabel: '-= 城市 =-',
                            dataValueField: 'city',
                            dataTextField: 'cityName'
                        });
                    $('<select id="areaEdit" data-bind="value: '+ options.field +'"></select>')
                        .appendTo(container)
                        .kendoDropDownList({
                            dataSource: {
                                transport: {
                                    read: function(options) {
                                        $.fn.ajaxPost({
                                            ajaxUrl: 'json/area.json',
                                            succeed: function(res) {
                                                options.success(res);
                                            },
                                            failed: function(res) {
                                                options.error(res);
                                            }
                                        });
                                    }
                                },
                                schema: {
                                    data: 'data'
                                }
                            },
                            autoBind: false,
                            cascadeFrom: 'cityEdit',
                            optionLabel: '-= 区县 =-',
                            dataValueField: 'area',
                            dataTextField: 'areaName'
                        });
                }
            },
            { field: 'domicile', title: '居住地', width: '100px',
                template: '#= domicile.name #',
                editor: function(container, options) {
                    $('<input data-bind="value: '+ options.field +'">')
                        .appendTo(container)
                        .kendoDropDownTree({
                            dataSource: {
                                transport: {
                                    read: function(options) {
                                        $.fn.ajaxPost({
                                            ajaxUrl: 'json/select_hierarchical_data.json',
                                            succeed: function(res) {
                                                options.success(res);
                                            },
                                            failed: function(res) {
                                                options.error(res);
                                            }
                                        });
                                    }
                                },
                                schema: {
                                    data: 'data',
                                    model: {
                                        children: 'items'
                                    }
                                }
                            },
                            placeholder: '-= 请选择 =-',
                            dataValueField: 'code',
                            dataTextField: 'name'
                        });
                }
            },
            { field: 'nation', title: '民族', width: '100px',
                template: '#= nation.nationName #',
                editor: function(container, options) {
                    $('<input data-bind="value: '+ options.field +'">')
                        .appendTo(container)
                        .kendoComboBox({
                            dataSource: {
                                transport: {
                                    read: function(options) {
                                        $.fn.ajaxPost({
                                            ajaxUrl: 'json/nation.json',
                                            succeed: function(res) {
                                                options.success(res);
                                            },
                                            failed: function(res) {
                                                options.error(res);
                                            }
                                        });
                                    }
                                },
                                schema: {
                                    data: 'data'
                                }
                            },
                            dataValueField: 'nation',
                            dataTextField: 'nationName',
                            suggest: true
                        });
                }
            },
            { field: 'zodiac', title: '生肖', width: '60px',
                template: '#= zodiac.zodiacName #',
                editor: function(container, options) {
                    $('<input data-bind="value: '+ options.field +'">')
                        .appendTo(container)
                        .kendoMultiColumnComboBox({
                            dataSource: {
                                transport: {
                                    read: function(options) {
                                        $.fn.ajaxPost({
                                            ajaxUrl: 'json/zodiac.json',
                                            succeed: function(res) {
                                                options.success(res);
                                            },
                                            failed: function(res) {
                                                options.error(res);
                                            }
                                        });
                                    }
                                },
                                schema: {
                                    data: 'data'
                                }
                            },
                            dataValueField: 'zodiac',
                            dataTextField: 'zodiacName',
                            columns: [
                                { field: 'zodiacName', title: '生肖' },
                                { field: 'zodiacValue1', title: '年份' },
                                { field: 'zodiacValue2', title: '年份' },
                                { field: 'zodiacValue3', title: '年份' },
                                { field: 'zodiacValue4', title: '年份' },
                                { field: 'zodiacValue5', title: '年份' }
                            ],
                            filter: 'contains',
                            filterFields: ['zodiacValue1', 'zodiacValue2', 'zodiacValue3', 'zodiacValue4', 'zodiacValue5'],
                            minLength: 4,
                            suggest: true
                        });
                }
            },
            { field: 'language', title: '语言', width: '210px',
                editor: function(container, options) {
                    $('<input data-bind="value: '+ options.field +'">')
                        .appendTo(container)
                        .kendoAutoComplete({
                            dataSource: {
                                transport: {
                                    read: function(options) {
                                        $.fn.ajaxPost({
                                            ajaxUrl: 'json/language.json',
                                            succeed: function(res) {
                                                options.success(res);
                                            },
                                            failed: function(res) {
                                                options.error(res);
                                            }
                                        });
                                    }
                                },
                                schema: {
                                    data: 'data'
                                }
                            },
                            dataTextField: 'language',
                            suggest: true,
                            separator: ' '
                        });
                }
            },
            { field: 'education', title: '教育程度', width: '130px',
                template:
                    '# for (i = 0; i < education.length; i++) { #' +
                        '# if (education[i] === "1") { #' +
                            '小学&nbsp;' +
                        '# } else if (education[i] === "2") { #' +
                            '初中&nbsp;' +
                        '# } else if (education[i] === "3") { #' +
                            '高中&nbsp;' +
                        '# } else if (education[i] === "4") { #' +
                            '中专&nbsp;' +
                        '# } else if (education[i] === "5") { #' +
                            '大专&nbsp;' +
                        '# } else if (education[i] === "6") { #' +
                            '本科&nbsp;' +
                        '# } else if (education[i] === "7") { #' +
                            '硕士&nbsp;' +
                        '# } else if (education[i] === "8") { #' +
                            '博士&nbsp;' +
                        '# } else if (education[i] === "9") { #' +
                            '其他&nbsp;' +
                        '# } #' +
                    '# } #',
                editor: function(container, options) {
                    $('<input class="k-checkbox" id="educationEdit1" type="checkbox" value="1" data-bind="checked: '+ options.field +'"><label class="k-checkbox-label" for="educationEdit1">小学</label>' +
                        '<input class="k-checkbox" id="educationEdit2" type="checkbox" value="2" data-bind="checked: '+ options.field +'"><label class="k-checkbox-label" for="educationEdit2">初中</label>' +
                        '<input class="k-checkbox" id="educationEdit3" type="checkbox" value="3" data-bind="checked: '+ options.field +'"><label class="k-checkbox-label" for="educationEdit3">高中</label>' +
                        '<input class="k-checkbox" id="educationEdit4" type="checkbox" value="4" data-bind="checked: '+ options.field +'"><label class="k-checkbox-label" for="educationEdit4">中专</label>' +
                        '<input class="k-checkbox" id="educationEdit5" type="checkbox" value="5" data-bind="checked: '+ options.field +'"><label class="k-checkbox-label" for="educationEdit5">大专</label>' +
                        '<input class="k-checkbox" id="educationEdit6" type="checkbox" value="6" data-bind="checked: '+ options.field +'"><label class="k-checkbox-label" for="educationEdit6">本科</label>' +
                        '<input class="k-checkbox" id="educationEdit7" type="checkbox" value="7" data-bind="checked: '+ options.field +'"><label class="k-checkbox-label" for="educationEdit7">硕士</label>' +
                        '<input class="k-checkbox" id="educationEdit8" type="checkbox" value="8" data-bind="checked: '+ options.field +'"><label class="k-checkbox-label" for="educationEdit8">博士</label>' +
                        '<input class="k-checkbox" id="educationEdit9" type="checkbox" value="9" data-bind="checked: '+ options.field +'"><label class="k-checkbox-label" for="educationEdit9">其他</label>')
                        .appendTo(container);
                }
            },
            { field: 'graduation', title: '毕业年份', width: '90px',
                editor: function(container, options) {
                    $('<input data-bind="value: '+ options.field +'">')
                        .appendTo(container)
                        .kendoDatePicker({
                            start: 'decade',
                            depth: 'decade',
                            format: 'yyyy',
                            footer: '今年：#= kendo.toString(data, "yyyy年") #'
                        });
                }
            },
            { field: 'firstJob', title: '参加工作年月', width: '110px',
                editor: function(container, options) {
                    $('<input type="month" data-bind="value: '+ options.field +'">')
                        .appendTo(container)
                        .kendoDatePicker({
                            start: 'year',
                            depth: 'year',
                            format: 'yyyy-MM',
                            footer: '当月：#= kendo.toString(data, "yyyy年MM月") #'
                        });
                }
            },
            { field: 'mobile', title: '手机', width: '120px',
                editor: function(container, options) {
                    $('<input class="k-textbox" type="tel" data-bind="value: '+ options.field +'">')
                        .appendTo(container);
                }
            },
            { field: 'email', title: '电子邮件', width: '180px',
                editor: function(container, options) {
                    $('<input class="k-textbox" type="email" data-bind="value: '+ options.field +'">')
                        .appendTo(container);
                }
            },
            { field: 'homepage', title: '个人主页', width: '190px',
                editor: function(container, options) {
                    $('<input class="k-textbox" type="url" data-bind="value: '+ options.field +'">')
                        .appendTo(container);
                }
            },
            { field: 'getUp', title: '起床时间', width: '90px',
                editor: function(container, options) {
                    $('<input type="time" data-bind="value: '+ options.field +'">')
                        .appendTo(container)
                        .kendoTimePicker({
                            format: 'HH:mm'
                        });
                }
            },
            { field: 'importantMoment', title: '最有意义的时刻', width: '150px',
                editor: function(container, options) {
                    $('<input type="datetime" data-bind="value: '+ options.field +'">')
                        .appendTo(container)
                        .kendoDateTimePicker({
                            format: 'yyyy-MM-dd HH:mm',
                            footer: '现在：#= kendo.toString(data, "yyyy年MM月dd日 HH:mm") #'
                        });
                }
            },
            { field: 'character', title: '性格', width: '90px',
                values: [
                    { text: '超级开朗', value: 10 },
                    { text: '非常开朗', value: 8 },
                    { text: '很开朗', value: 6 },
                    { text: '比较开朗', value: 4 },
                    { text: '有点开朗', value: 2 },
                    { text: '普通', value: 0 },
                    { text: '有点内向', value: -2 },
                    { text: '比较内向', value: -4 },
                    { text: '很内向', value: -6 },
                    { text: '非常内向', value: -8 },
                    { text: '超级内向', value: -10 }
                ],
                editor: function(container, options) {
                    $('<input type="range" data-bind="value: '+ options.field +'">')
                        .appendTo(container)
                        .kendoSlider({
                            decreaseButtonTitle: '内向',
                            increaseButtonTitle: '开朗',
                            min: -10,
                            max: 10,
                            smallStep: 2,
                            largeStep: 1,
                            tooltip: {
                                template: '# if(value==10){ #超级开朗# }else if(value==8){ #非常开朗# }else if(value==6){ #很开朗# }else if(value==4){ #比较开朗# }else if(value==2){ #有点开朗# }else if(value==-2){ #有点内向# }else if(value==-4){ #比较内向# }else if(value==-6){ #很内向# }else if(value==-8){ #非常内向# }else if(value==-10){ #超级内向# }else{ #普通# } #'
                            }
                        });
                }
            },
            { field: 'color', title: '颜色喜好', width: '90px',
                template: '<span style="display: inline-block; width: 100%; height: 24px; background: #= color #; border: 1px solid \\#c5c5c5; border-radius: 4px; vertical-align: middle;"></span>',
                editor: function(container, options) {
                    $('<input data-bind="value: '+ options.field +'">')
                        .appendTo(container)
                        .kendoColorPicker({
                            opacity: true,
                            buttons: false
                        });
                }
            },
            { field: 'constellation', title: '相配的星座', width: '170px',
                template:
                    '# for (i = 0; i < constellation.length; i++) { #' +
                        '# if (constellation[i] === "1") { #' +
                            '白羊座&nbsp;' +
                        '# } else if (constellation[i] === "2") { #' +
                            '金牛座&nbsp;' +
                        '# } else if (constellation[i] === "3") { #' +
                            '双子座&nbsp;' +
                        '# } else if (constellation[i] === "4") { #' +
                            '巨蟹座&nbsp;' +
                        '# } else if (constellation[i] === "5") { #' +
                            '狮子座&nbsp;' +
                        '# } else if (constellation[i] === "6") { #' +
                            '处女座&nbsp;' +
                        '# } else if (constellation[i] === "7") { #' +
                            '天秤座&nbsp;' +
                        '# } else if (constellation[i] === "8") { #' +
                            '天蝎座&nbsp;' +
                        '# } else if (constellation[i] === "9") { #' +
                            '射手座&nbsp;' +
                        '# } else if (constellation[i] === "10") { #' +
                            '山羊座&nbsp;' +
                        '# } else if (constellation[i] === "11") { #' +
                            '水瓶座&nbsp;' +
                        '# } else if (constellation[i] === "12") { #' +
                            '双鱼座&nbsp;' +
                        '# } #' +
                    '# } #',
                editor: function(container, options) {
                    $('<select multiple data-bind="value: '+ options.field +'"></select>')
                        .appendTo(container)
                        .kendoMultiSelect({
                            dataSource: {
                                data: [
                                    { text: '白羊座', value: '1' },
                                    { text: '金牛座', value: '2' },
                                    { text: '双子座', value: '3' },
                                    { text: '巨蟹座', value: '4' },
                                    { text: '狮子座', value: '5' },
                                    { text: '处女座', value: '6' },
                                    { text: '天秤座', value: '7' },
                                    { text: '天蝎座', value: '8' },
                                    { text: '射手座', value: '9' },
                                    { text: '山羊座', value: '10' },
                                    { text: '水瓶座', value: '11' },
                                    { text: '双鱼座', value: '12' }
                                ]
                            },
                            placeholder: '-= 请选择 =-',
                            dataValueField: 'value',
                            dataTextField: 'text',
                            autoClose: false,
                            valuePrimitive: true
                        });
                }
            },
            { field: 'summary', title: '自我介绍', width: '290px',
                editor: function(container, options) {
                    $('<textarea class="k-textarea" data-bind="value: '+ options.field +'"></textarea>')
                        .appendTo(container);
                }
            },
            { field: 'photo', title: '头像', width: '120px',
                template: '<a href="javascript:showBigPic(\'#= photo.url #\');"><img class="w-25 rounded-circle" src="#= photo.url #" alt="#= photo.name ##= photo.extension #"></a><small class="ml-2 text-muted">[#= kendo.toString(photo.size/1000, "0.00") # KB]</small>',
                editor: function(container, options) {
                    $('<div class="media">' +
                            '<img class="img-thumbnail w-25 mr-2" id="photoShow" src="'+ options.model.photo.url +'" alt="'+ options.model.photo.name + options.model.photo.extension +'" title="'+ kendo.toString(options.model.photo.size/1000, "0.00") +' KB">' +
                            '<div class="media-body">' +
                                '<input id="photoEdit" type="file">' +
                            '</div>' +
                        '</div>')
                        .appendTo(container);
                    $('#photoEdit')
                        .kendoUpload({
                            async: {
                                saveUrl: 'json/upload.json',
                                removeUrl: 'json/upload.json'
                            },
                            multiple: false,
                            files: [
                                {
                                    name: options.model.photo.name,
                                    size: options.model.photo.size,
                                    extension: options.model.photo.extension
                                }
                            ],
                            validation: {
                                allowedExtensions: ['.jpg', '.png', '.gif', '.bmp'],
                                maxFileSize: 10000000
                            },
                            success: function(res) {
                                if (res.response.result === 'y') {
                                    if (res.operation === 'upload') {
                                        options.model.set('photo.url', res.response.data.url);
                                        options.model.set('photo.name', res.response.data.name);
                                        options.model.set('photo.extension', res.response.data.extension);
                                        options.model.set('photo.size', res.response.data.size);
                                        $('#photoShow').attr('src', res.response.data.url);
                                        alertMsg(res.response.msg, 'success');
                                    }
                                    if (res.operation === 'remove') {
                                        options.model.set('photo.url', 'img/avatar.png');
                                        options.model.set('photo.name', 'avatar');
                                        options.model.set('photo.extension', '.png');
                                        options.model.set('photo.size', 53284);
                                        $('#photoShow').attr('src', 'img/avatar.png');
                                    }
                                } else {
                                    $('.k-upload-files').remove();
                                    alertMsg(res.response.msg, 'error');
                                }
                            }
                        });
                }
            },
            { field: 'sign', title: '签名', width: '290px',
                template: '#= sign #',
                editor: function(container, options) {
                    $('<textarea data-bind="value: '+ options.field +'"></textarea>')
                        .appendTo(container)
                        .kendoEditor({
                            tools: [
                                'bold',
                                'italic',
                                'underline',
                                'strikethrough',
                                'foreColor',
                                'backColor',
                                'justifyLeft',
                                'justifyCenter',
                                'justifyRight',
                                'justifyFull',
                                'insertUnorderedList',
                                'insertOrderedList',
                                'indent',
                                'outdent',
                                'viewHtml'
                            ]
                        });
                }
            }
        ],
        noRecords: {
            template: '无相关数据'
        },
        pageable: {
            buttonCount: 5,
            input: true,
            pageSizes: [5, 10, 15, 20, 25, 30, 50, 100, 'all'],
            refresh: true
        },
        reorderable: true,
        resizable: true,
        editable: {
            mode: 'popup',
            window: {
                width: 'auto',
                height: '40%'
            }
        },
        edit: function(e) {
            if (e.model.id === '') {
                e.container.kendoWindow('title', '新增');
            } else {
                e.container.kendoWindow('title', '编辑');
            }
        }
    });
});