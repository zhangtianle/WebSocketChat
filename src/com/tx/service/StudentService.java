package com.tx.service;

import com.tx.DAO.StudentDAO;

public class StudentService {

	StudentDAO sdao = new StudentDAO();

	public boolean login(String name, String password) {
		boolean result = false;
		if (password.equals(sdao.getpwd(name))) {
			result = true;
		}
		return result;
	}
	
	public boolean register(String name, String password) {
		if(sdao.register(name, password) == 1) {
			return true;
		} else {
			return false;
		}
	}
}
