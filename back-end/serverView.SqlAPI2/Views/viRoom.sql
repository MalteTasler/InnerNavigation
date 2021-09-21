CREATE VIEW [dbo].[viRoom]
	AS SELECT
		Room.Name,
		Sector.Name AS Sector,
		Location.Name AS Location,
		Address.Number AS LotNumber,
		Address.Street AS Street,
		Address.ZIP AS ZIP,
		Address.City AS City,
		Address.Country AS Country
	FROM [Room]
	INNER JOIN Sector on Room.Sector = Sector.Id
	Inner JOIN Location on Sector.Location = Location.Id
	Inner JOIN Address on Location.Address = Address.Id
	WHERE Room.DeleteTime IS NULL AND Room.Id != 0
