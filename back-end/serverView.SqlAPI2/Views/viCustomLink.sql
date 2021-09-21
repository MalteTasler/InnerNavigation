CREATE VIEW [dbo].[viCustomLink]
	AS SELECT CustomLink.Id, 
	CustomLink.Name,
	CustomLink.Ref
	FROM CustomLink
	WHERE CustomLink.DeleteTime IS NULL
