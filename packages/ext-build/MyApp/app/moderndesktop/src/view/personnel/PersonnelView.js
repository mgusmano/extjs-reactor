Ext.define('MyApp.view.personnel.PersonnelView',{
	extend: 'Ext.grid.Grid',
	xtype: 'personnelview',
	cls: 'personnelview',
	requires: [],
	controller: {type: 'personnelviewcontroller'},
	viewModel: {type: 'personnelviewmodel'},
	store: {type: 'personnelviewstore'},
	selectable: { mode: 'single' },
	listeners: {
		select: 'onItemSelected'
	},
	columns: [
		{ 
			text: 'Name',
			dataIndex: 'name',
			width: 100,
			cell: {userCls: 'bold'}
		},
		{text: 'Email',dataIndex: 'email',width: 230},
		{
			text: 'Phone',
			dataIndex: 'phone',
			width: 150 
		}
	]
});
