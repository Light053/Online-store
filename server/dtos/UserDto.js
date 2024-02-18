module.exports = class UserDto {
	username;
	id;

	constructor(model) {
		this.username = model;
		this.id = model._id
	}
}