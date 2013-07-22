package jgossit.server;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Scoreboard extends HttpServlet
{
	private static final long serialVersionUID = 1L;
	
	public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException
	{
		String league = req.getParameter("league");
		String date = req.getParameter("date");
		if (league == null || date == null)
			resp.sendRedirect("scoreboard.html");
		
		resp.setContentType("text/html; charset=UTF-8");
		getScoreboard(league, date, resp.getWriter());
	}
	
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException
	{
		doPost(req, resp);
	}
	
	private static final String JQUERY_CODE = 
			"<link type='text/css' href='jquery-ui.css' rel='Stylesheet'/>\n" + 
			"<script type='text/javascript' src='jquery-1.9.1.js'></script>\n" + 
			"<script type='text/javascript' src='jquery-ui.js'></script>\n";
	
	private void getScoreboard(String league, String date, PrintWriter printWriter) throws IOException
	{
		String address = "http://sports.yahoo.com/" + league + "/scoreboard?d=" + date;
		URL url = new URL(address);
		HttpURLConnection urlConnection = (HttpURLConnection)url.openConnection();
		urlConnection.setUseCaches(false);
		urlConnection.setDefaultUseCaches(false);
		urlConnection.addRequestProperty("Cache-Control", "no-cache,max-age=0");
		urlConnection.addRequestProperty("Pragma", "no-cache");
		BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
		String line = null;
		while ((line = br.readLine()) != null)
		{
			if (line.equals("</head>"))
			{
				printWriter.println(JQUERY_CODE);
				printWriter.println("<script type='text/javascript' src='scoreboard-" + league + ".js'></script>");
			}
			
			if (line.contains("refreshTime")) // don't refresh the page (every 60 seconds), also URL would need correcting
				continue;
			printWriter.println(line);
		}
		br.close();
		urlConnection.disconnect();
	}
}