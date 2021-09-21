/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [Id]
      ,[Name]
      ,[DisplayName]
      ,[RunsOn]
      ,[CreationTime]
  FROM [ServerCheck2].[dbo].[viService]