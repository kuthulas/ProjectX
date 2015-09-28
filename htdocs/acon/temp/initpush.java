package hcs;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

// Prepares the required database structures for Aggregation Configurator //
public class initpush {
    public static void main(String[] args) throws Exception {
        Class.forName("com.mysql.jdbc.Driver").newInstance();
        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/hcs?" +
        		"user=root");
        Statement stat = conn.createStatement();
        String[][] tables = {
        {"cxnz","id","conlabel","cpid","type","src","tgt","srcepid","tgtepid"},
        {"inv","type","name","pipa","user","pass","ptop","pleft"},						
        {"fpgw","id","p1","p2","p3","p4","p5"},
        {"fsbc","id", "p1","p2","p3","p4","p5"},
        {"opgw","id","trnkgrpin","trnkgrpout","svc","sipprofile","distrib","mgcdomain","destination","portin","portout","rttrnkname","rtlistname"},
        {"osbc","id", "adjname","description","vrf","sigip","portin","peerip","peerport"},
        {"tpgw","tag","cmd"},
        {"tsbc","tag","cmd"},
        {"clusters","type","ptop","pleft","name","customer","ip1","portin","cpid","nodes","ip2","ip3","ip4","ip5","ip6","ip7","ip8"},
        {"sbcint","interface","vrf","ip"},
        {"globals","rtlistpref","rtlistpstnpref","rtpref","rtpstnpref","pgwinsipprofilepref","pgwoutsipprofilepref","svc","trnkgrprangestart","ntrnkgrpreserved","ipttrnkgrpin","ipttrnkgrpout","sbcinport","defpstnport","pstntrnkgrpin","pstntrnkgrpout"},
        {"countries","name","code","ox","oy","ip","port"},
        {"ports","id","value"}};
        
        for(int i=1; i<=tables.length; i++){
        		String s = "create table " + tables[i-1][0] + " (";;
        	for(int j=2; j<=tables[i-1].length; j++){
        		s += tables[i-1][j-1] + " VARCHAR(1000)";
        		if (j != tables[i-1].length) s += ",";
        	}
        	s+=");";
        	System.out.println(s);
        	stat.executeUpdate(s);
       }
// Sample data
        stat.executeUpdate("insert into inv values(\"pgw\",\"HCS-PGW-1\",\"10.1.2.20\",\"mgcusr\",\"hcs\",\"20\",\"30\");"); 	
        stat.executeUpdate("insert into inv values(\"sbc\",\"Verizon-CUBE-SP\",\"10.1.2.21\",\"cisco\",\"cisco\",\"20\",\"60\");");
        stat.executeUpdate("insert into fpgw values(1,1,0,1,0,0);");
        stat.executeUpdate("insert into fsbc values(1,0,1,0,1,0);");
        stat.executeUpdate("insert into globals values(\"rtlist2lc\",\"rtlist2pstn\",\"rtetolc\",\"routeto\",\"inprofile\",\"outprofile\",\"sip-path\",\"2000\",\"20\",\"1001\",\"2001\",\"5064\",\"5060\",\"5000\",\"5001\");");
        stat.executeUpdate("insert into clusters values(\"cluster\",\"10\",\"50\",\"e1c1p\",\"ent1\",\"10.1.2.20\",\"5060\",\"0001\",\"1\",\"VRF:IP\",\"VRF:IP\",\"VRF:IP\",\"VRF:IP\",\"VRF:IP\",\"VRF:IP\",\"VRF:IP\");");
        stat.executeUpdate("insert into clusters values(\"cluster\",\"10\",\"60\",\"e2c1p\",\"ent2\",\"10.2.2.20\",\"5065\",\"0002\",\"1\",\"VRF:IP\",\"VRF:IP\",\"VRF:IP\",\"VRF:IP\",\"VRF:IP\",\"VRF:IP\",\"VRF:IP\");");
        stat.executeUpdate("insert into clusters values(\"cluster\",\"10\",\"70\",\"e3c1p\",\"ent3\",\"10.3.2.20\",\"5067\",\"0003\",\"2\",\"10.3.2.21\",\"VRF:IP\",\"VRF:IP\",\"VRF:IP\",\"VRF:IP\",\"VRF:IP\",\"VRF:IP\");");
        stat.executeUpdate("insert into clusters values(\"cluster\",\"10\",\"80\",\"e3c2p\",\"ent3\",\"10.3.2.21\",\"5066\",\"0005\",\"1\",\"VRF:IP\",\"VRF:IP\",\"VRF:IP\",\"VRF:IP\",\"VRF:IP\",\"VRF:IP\",\"VRF:IP\");");
        stat.executeUpdate("insert into clusters values(\"cluster\",\"10\",\"90\",\"e4c1p\",\"ent4\",\"10.4.2.21\",\"5071\",\"0004\",\"1\",\"VRF:IP\",\"VRF:IP\",\"VRF:IP\",\"VRF:IP\",\"VRF:IP\",\"VRF:IP\",\"VRF:IP\");");
        stat.executeUpdate("insert into countries values(\"India\",\"091\",1390,400,\"172.18.135.231\",\"5071\");");
        stat.executeUpdate("insert into countries values(\"United States\",\"001\",357,292,\"172.18.142.231\",\"5067\");");
        stat.executeUpdate("insert into countries values(\"United Kingdom\",\"044\",923,196,\"172.18.186.231\",\"5078\");");
// PGW Template (Source) --------------------------------------
        String[][] PC = {{"addtrnkgrp","prov-add:trnkgrp:name=\"\"#trnkgrpname#\"\",type=\"\"IP_SIP\"\",svc=\"\"#svc#\"\""},
        		{"addtrnkgrpprof","prov-add:TRNKGRPPROF:name=\"\"#trnkgrpname#\"\",profile=\"\"#sipprofile#\"\""},
        		{"addsiprttrnkgrp","prov-add:siprttrnkgrp: name=\"\"#trnkgrpname#\"\", url=\"\"#destination#\"\", srvrr=0,sipproxyport=#sipproxyport#, version=\"\"2.0\"\",cutthrough=2, extsupport=1, domainbasedrtgsupport=0"},
        		{"addrttrnk","prov-add:rttrnk:weightedTG=\"\"OFF\"\",name=\"\"#rttrnkname#\"\",trnkgrpnum=#trnkgrpname#"},
        		{"addrtlist","prov-add:rtlist:name=\"\"#rtlistname#\"\",rtname=\"\"#rttrnkname#\"\",distrib=\"\"#distrib#\"\""}
        };
        for(int i=0; i<PC.length; i++){
        	stat.executeUpdate("insert into tpgw values(\""+PC[i][0]+"\", "+"\""+PC[i][1]+"\");"); 
        }
// SBC Template (Source)
        String[][] SC = {{"out","adjacency sip #adjname#"},
        		{"out","description #description#"},
        		{"out","force-signaling-peer"},
        		{"out","vrf #vrf#"},
        		{"out","nat force-off"},
        		{"out","preferred-transport tcp"},
        		{"out","signaling-address ipv4 #sigip#"},
        		{"out","signaling-port #portin#"},
        		{"out","remote-address ipv4 #peerip# 255.255.255.255"},
        		{"out","signaling-peer #peerip#"},
        		{"out","account #vrf#"},
        		{"out","sipi passthrough"},
        		{"out","media-late-to-early-iw incoming"},
        		{"out","media-late-to-early-iw outgoing"},
        		{"out","attach"}
        };
        for(int j=0; j<SC.length; j++){
        	stat.executeUpdate("insert into tsbc values(\""+SC[j][0]+"\", "+"\""+SC[j][1]+"\");"); 
        }
// PGW Template (Destination)
        //same except for profile

// SBC Template (Destination)
        //same
        conn.close();
    }
  }