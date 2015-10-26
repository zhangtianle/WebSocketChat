package com.tx.controller;

/*所有的mvc控制器都在这个类里
 * 
 */


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.tx.service.StudentService;

@Controller
public class MainController {
	
	@RequestMapping("toClient.do")
	public String toClient(){
		return "client" ;
	}
	
	@RequestMapping("loginServer.do")
	public ModelAndView login(@RequestParam("username") String username,
			@RequestParam("password") String password) {
		
		ModelAndView modelAndView = new ModelAndView();  
		StudentService ss = new StudentService();
		boolean r = ss.login(username, password);
		if (r) {
			 modelAndView.addObject("name", username);  
			 modelAndView.setViewName("chat");  
		} else {
			modelAndView.setViewName("login");  
			
		}
		return modelAndView;  
	}
	
	@RequestMapping("register.do")
	public String gtRegister() {
		return "register";
	}
	
	@RequestMapping("login.do")
	public String gtLogin() {
		return "login";
	}

	@RequestMapping(value = "registerServer.do", method = RequestMethod.POST)
	public ModelAndView gtRegister(@RequestParam("username") String username,
			@RequestParam("password") String password) {
		StudentService ss = new StudentService();
		ModelAndView modelAndView = new ModelAndView();  
		boolean r = ss.register(username, password);
		if (r) {
			 modelAndView.addObject("name", username);  
			 modelAndView.setViewName("chat");  
		} else {
			modelAndView.setViewName("login");  
		}
		return modelAndView;
	}

}
