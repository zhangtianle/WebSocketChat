package com.tx.tools;


import java.io.IOException;
import java.io.InputStream;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

/*This class contains a set of APIs to make your develop more convenient */
public class Helper {
	
	/*This method load mybatis configuration and return a sqlSessionFactory
	 *@return:sqlSessionFactory
	 **/
	public static SqlSessionFactory getSessionFactory(){
		String resource = "mybatis-config.xml";
    	InputStream inputStream = null;
		try {
			inputStream = Resources.getResourceAsStream(resource);
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		SqlSessionFactoryBuilder sfb =  new SqlSessionFactoryBuilder();
    	SqlSessionFactory sqlSessionFactory = sfb.build(inputStream);
    	return sqlSessionFactory;
	}

}
