/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/
DECLARE @standardServer int
DECLARE @standardNetwork int
declare @standardAddress int
declare @standardLocation int
declare @standardSector int
declare @standardRoom int
declare @standardPosition int
DECLARE @noNetwork int
declare @noServer int



IF NOT (EXISTS(SELECT Id From Server WHERE Name=N'noHost'))
begin
INSERT INTO Server
(Name, Comment, MemberOff, VirtualHost, IPAddress, Position)
values
(N'noHost', NULL, NUll, NUll, NULL, NULL)
end
set @noServer = (SELECT Id FROM Server WHERE Name=N'noHost')

IF NOT (EXISTS(SELECT Id From Network WHERE Name=N'noNetwork'))
begin
INSERT INTO Network
(Name, SubnetOff)
values
(N'noNetwork', NULL)
end
set @noNetwork = (SELECT Id FROM Network WHERE Name=N'noNetwork')


IF Not (EXISTS (SELECT Id From CustomLink WHERE Name = N'Standard-CustomLink'))
begin
INSERT INTO CustomLink
(Name, Ref)
values
(N'Standard-CustomLink', N'https://gitlab.tobit.com')
end

IF NOT (EXISTS(SELECT Id From Address WHERE Street=N'Standard-Address'))
begin
INSERT INTO Address
(Number, Street, ZIP, City, Country)
values
(1, N'Standard-Address', N'12345', N'City', N'Land')
end

set @standardAddress = (SELECT Id FROM Address WHERE Street=N'Standard-Address')

IF NOT (EXISTS(SELECT Id From Location WHERE Name=N'Standard-Location'))
begin
INSERT INTO Location
(Name, Address)
values
(N'Standard-Location', @standardAddress)
end
set @standardLocation = (SELECT Id FROM Location WHERE Name=N'Standard-Location')

IF NOT (EXISTS(SELECT Id From Sector WHERE Name=N'Sector'))
begin
INSERT INTO Sector
(Name, Location)
values
(N'Sector', @standardLocation)
end
set @standardSector = (SELECT Id FROM Sector WHERE Name=N'Sector')

IF NOT (EXISTS(SELECT Id From Room WHERE Name=N'Standard-Room'))
begin
INSERT INTO Room
(Name, Sector)
values
(N'Standard-Room', @standardSector)
end
set @standardRoom = (SELECT Id FROM Room WHERE Name = N'Standard-Room')

IF NOT (EXISTS(SELECT Id From Position WHERE x= 373 AND y = 56 AND Room = @standardRoom))
begin
INSERT INTO Position
(x, y, Room)
values
(373, 56, @standardRoom)
end
set @standardPosition = (SELECT Id FROM Position WHERE x = 373 AND y = 56 AND Room = @standardRoom)

IF NOT (EXISTS(SELECT Id From Network WHERE Name=N'Standard-Network'))
begin
INSERT INTO Network
(Name, SubnetOff)
values
(N'Standard-Network', @noNetwork)
end

set @standardNetwork = (SELECT Id FROM Network WHERE Name = N'Standard-Network')

IF NOT (EXISTS(SELECT Id From Server WHERE Name=N'Standard-Server'))
begin
INSERT INTO Server
(Name, Comment, MemberOff, VirtualHost, IPAddress, Position)
values
(N'Standard-Server', NULL, @standardNetwork, @noServer, N'192.168.14.2', @standardPosition)
end

IF NOT (EXISTS(SELECT Id From Category WHERE Name=N'Standard-Category'))
begin
INSERT INTO Category
(Name, DisplayName, Port)
values
(N'Standard-Category', N'Standard-Category', N'80')
end

set @standardServer = (SELECT Id From Server WHERE Name = N'Standard-Server')
IF NOT (EXISTS(SELECT Id From Service WHERE Name=N'Standard-Service'))
begin
INSERT INTO Service
(Name, RunsOn)
values
(N'Standard-Service', @standardServer)
end

