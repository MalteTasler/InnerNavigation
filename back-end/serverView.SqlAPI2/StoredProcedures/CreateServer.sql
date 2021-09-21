CREATE PROCEDURE [dbo].[CreateServer]
	@StartTime datetimeoffset,
	@Name nvarchar(64),
	@Comment nvarchar(MAX),
	@MemberOff nvarchar(64),
	@VirtualHost nvarchar(64),
	@IPAddress nvarchar(16),
	@PositionX int,
	@PositionY int,
	@Room nvarchar(16),
	@Sector varchar(8),
	@Location nvarchar(32),
	@LotNumber varchar(16),
	@Street nvarchar(32),
	@ZIP char(5),
	@City nvarchar(16),
	@Country nvarchar(16)
AS
begin
	declare @dbId int
	declare @weekdayname int
	declare @nId int
	declare @sId int
	declare @AddressId int
	declare @LocationId int
	declare @SectorId int
	declare @RoomId int
	declare @PositionId int
	IF @MemberOff = N'' set @nId = (SELECT Id FROM Network WHERE Name = N'noNetwork')
	ELSE set @nId = (SELECT Id FROM Network WHERE Name = @MemberOff)
	IF @VirtualHost = N'' set @sId = (SELECT Id FROM Server WHERE Name = N'noHost')
	ELSE set @sId = (SELECT Id FROM Server WHERE Name = @VirtualHost)

	IF NOT(EXISTS(SELECT Id FROM Location WHERE Location.Name = @Location
	))
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
		INSERT INTO Location
			(Name, Address)
		values
			(@Location, @AddressId) 
		set @LocationId = SCOPE_IDENTITY()
	END
	ELSE
	BEGIN
		set @LocationId = (SELECT Id FROM Location WHERE Location.Name = @Location)
	END
	IF NOT(EXISTS (SELECT Id FROM Sector WHERE Sector.Name = @Sector AND Location =
		@LocationId
	))
	BEGIN
		INSERT INTO Sector
			(Name, Location)
		values
			(@Sector, @LocationId)
		set @SectorId = SCOPE_IDENTITY()
	END
	ELSE
	BEGIN
		set @SectorId = (SELECT Id FROM Sector WHERE Sector.Name = @Sector AND Location = @LocationId)
	END
	IF NOT(EXISTS(SELECT Id FROM Room WHERE Room.Name = @Room AND Sector =
		@SectorId
	))
	BEGIN
		INSERT INTO Room
			(Name, Sector)
		values
			(@Room, @SectorId)
		set @RoomId = SCOPE_IDENTITY()
	END
	ELSE
	BEGIN
		set @RoomId = (SELECT Id FROM Room WHERE Room.Name = @Room AND Sector = @SectorId)
	END
	IF NOT(EXISTS(SELECT Id FROM Position WHERE x = @PositionX AND y = @PositionY AND Room =
		@RoomId
	))
	BEGIN
		INSERT INTO Position
			(x, y, Room)
		values
			(@PositionX, @PositionY, @RoomId)
		set @PositionId = SCOPE_IDENTITY()
	end
	ELSE
	BEGIN
		set @PositionId = (SELECT Id FROM Position WHERE x = @PositionX AND y = @PositionY AND Room = @RoomId)
	END
	IF NOT(EXISTS(SELECT Id From Server WHERE Name = @Name))
	BEGIN
		INSERT INTO Server
			(Comment, Name, MemberOff, VirtualHost, IPAddress, Position)
		values
			(@Comment, @Name, @nId, @sId, @IPAddress, @PositionId)
		set @dbId = SCOPE_IDENTITY()
		SELECT * FROM viServer WHERE Id = @dbId	
	END
	ELSE
	BEGIN
		UPDATE Server
		set Comment = @Comment, MemberOff = @nId, VirtualHost=@sId, IPAddress= @IPAddress, Position =@PositionId
	END
end