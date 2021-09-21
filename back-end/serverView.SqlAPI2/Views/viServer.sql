CREATE VIEW [dbo].[viServer]
	AS SELECT Server.Id, 
	Server.Name,
	Server.Comment,
	Network.Name AS MemberOff,
	second.Name AS VirtualHost,
	Server.IPAddress,
	Position.x AS PositionX,
	Position.y AS PositionY,
	Room.Name AS Room,
	Sector.Name AS Sector,
	Location.Name AS Location,
	Address.Number AS LotNumber,
	Address.Street,
	Address.ZIP,
	Address.City,
	Address.Country,
	Server.CreationTime
	FROM Server
	INNER JOIN Network on Server.MemberOff = Network.Id
	Inner JOIN Server second on Server.VirtualHost = second.Id
	INNER JOIN Position on Server.Position = Position.Id
	INNER JOIN Room on Position.Room = Room.Id
	INNER JOIN Sector on Room.Sector = Sector.Id
	Inner JOIN Location on Sector.Location = Location.Id
	Inner JOIN Address on Location.Address = Address.Id
	WHERE Server.DeleteTime IS NULL AND Server.Id != (SELECT Id FROM Server WHERE Name = N'noHost')
