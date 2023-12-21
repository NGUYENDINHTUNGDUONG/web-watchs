const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema(
	{
		name: {type: String, required: true, unique: true},
		phone: {type: Number, required: true},
		email: {type: String, required: true},
		address: {type: Array, required: true},
		fax: {type: String},
		taxCode: {type: Number},
	},
	{
		versionKey: false,
		timestamps: true,
	}
);
supplierSchema.virtual('brands', {
	ref: 'Brand',
	localField: '_id',
	foreignField: 'supplier',
});
supplierSchema.set('toObject', {virtuals: true});
supplierSchema.set('toJSON', {virtuals: true});
supplierSchema.index({name: 'text'});

const SupplierModel = mongoose.model('Supplier', supplierSchema);

module.exports = SupplierModel;
