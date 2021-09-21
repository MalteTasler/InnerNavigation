CREATE PROCEDURE [dbo].[Create]
	@Name nvarchar(64),
	@LotNumber varchar(16),
	@Street nvarchar(32),
	@ZIP char(5),
	@City nvarchar(16),
	@Country nvarchar(16)

AS
begin
	declare @dbId int
	declare @AddressId int

	IF NOT(EXISTS(SELECT Id FROM Address WHERE Address.Number = @LotNumber AND Address.Street = @Street AND Address.ZIP = @ZIP AND Address.City = @City AND Address.Country = @Country))
	BEGIN
		INSERT INTO Address
			(Number, Street, ZIP, City, Country)
			values
			(
				@LotNumber,
				@Street,
				@ZIP,
				@City,
				@Country
			)
		set @AddressId = SCOPE_IDENTITY()
	END
	ELSE
	BEGIN
		set @AddressId = (SELECT ID FROM Address WHERE Address.Number = @LotNumber AND Address.Street = @Street AND Address.ZIP = @ZIP AND Address.City = @City AND Address.Country = @Country)
	END
	IF NOT(EXISTS(SELECT Id FROM Location WHERE Location.Name = @Name
	))
	BEGIN
		INSERT INTO Location
			(Name, Address)
		values
			(@Name, @AddressId) 
		set @dbId = SCOPE_IDENTITY()
	END
	ELSE
	BEGIN
		UPDATE Location
		set Address = @AddressId
	END	
end