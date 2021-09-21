CREATE VIEW [dbo].[viSector]
	AS SELECT
		Sector.Name,
		Location.Name AS Location,
		Address.Number AS LotNumber,
		Address.Street AS Street,
		Address.ZIP AS ZIP,
		Address.City AS City,
		Address.Country AS Country
	FROM [Sector]
	Inner JOIN Location on Sector.Location = Location.Id
	Inner JOIN Address on Location.Address = Address.Id
	WHERE Sector.DeleteTime IS NULL AND SECTOR.Id != 0
