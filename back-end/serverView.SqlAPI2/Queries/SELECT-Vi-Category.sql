/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [Id]
      ,[Name]
      ,[DisplayName]
      ,[isHTTPS]
      ,[Port]
      ,[CreationTime]
  FROM [ServerCheck2].[dbo].[viCategory]