/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [Id]
      ,[DisplayName]
      ,[Name]
      ,[RunsOn]
      ,[CreationTime]
      ,[DeleteTime]
  FROM [ServerCheck2].[dbo].[Service]