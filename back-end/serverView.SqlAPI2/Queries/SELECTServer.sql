/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [Id]
      ,[Comment]
      ,[Name]
      ,[MemberOff]
      ,[VirtualHost]
      ,[IPAddress]
      ,[CreationTime]
      ,[DeleteTime]
  FROM [ServerCheck2].[dbo].[Server]