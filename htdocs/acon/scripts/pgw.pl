#!/usr/bin/perl -w
use Expect;
use strict;
use POSIX;
 
#Change these to your settings
my $username = "username";
my $password = "password";
my $backupdir = "/usr/local/configs/";
 
my $host = $ARGV[0];
my $filename;
my $timeout = 10;
my @logfile;
 
$filename = strftime("$host-%m-%d-%Y.%H:%M.txt", localtime);
my $filepath = "$backupdir$host/$filename";
 
mkdir "$backupdir$host";
&getconfig;
 
@ARGV = ("$filepath");
$^I = ".bak";
while (<>)  {
        s/\w+#\s.*\r//||s/^Logoff//||s/^Connection to.*//||s/\r//;
        print;
}
unlink "$filepath.bak";
 
sub getconfig {
my $command = Expect->spawn("ssh $username\@$host");
$command->expect($timeout, -re => "password:") or die("Failed to get password prompt");
print $command "$password\r";
sleep 1;
print $command "enable\r";
$command->expect($timeout, -re => "Password:") or die("Did not get a password prompt\n");
print $command "$password\r";
print $command "terminal pager 0\r";
$command->log_file("$filepath");
print $command "more system:running-config\r";
my $redo = 1;
while($redo)
{ $command->clear_accum();
  $command->expect(1,
               [ qr/More/ => sub { my $comand = shift; print $command "\r"; exp_continue; } ],
               [ qr/#/ => sub { my $exp = shift; $redo = 0; exp_continue; } ],
              );
}
print $command "exit\r";
$command->soft_close();
$command->log_file(undef);
}