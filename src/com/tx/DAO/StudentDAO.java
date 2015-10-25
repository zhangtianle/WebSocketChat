package com.tx.DAO;

import org.apache.ibatis.session.SqlSession;
import org.springframework.ui.Model;

import com.tx.model.Mapper;
import com.tx.tools.Helper;

public class StudentDAO {
	SqlSession session = Helper.getSessionFactory().openSession();
	Mapper mapper = session.getMapper(Mapper.class);
	
	public String getpwd(String username){
		return mapper.getpwd(username);
	}
	
	public int register(String name, String password) {
		int result = 0;
		SqlSession session = Helper.getSessionFactory().openSession();
		try {
			Mapper mapper = session.getMapper(Mapper.class);
			result = mapper.register(name, password);
			session.commit();
		} finally {
			session.close();
		}
		return result;
	}
}
