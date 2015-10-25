package com.tx.model;


import org.apache.ibatis.annotations.Param;


/*mybaits mapper
 * 
 */

public interface Mapper {
	
	
	public String getpwd(String stuName);
	
	public int register(@Param("stuName")String stuName, @Param("stuPassword")String stuPassword);
}
