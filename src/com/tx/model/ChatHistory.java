package com.tx.model;

import java.util.Date;

public class ChatHistory {
	private int id;
	private Date hdate;
	private String hcontent;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Date getHdate() {
		return hdate;
	}
	public void setHdate(Date hdate) {
		this.hdate = hdate;
	}
	public String getHcontent() {
		return hcontent;
	}
	public void setHcontent(String hcontent) {
		this.hcontent = hcontent;
	}
	
	
}
