package com.justcloud.osgifier;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import org.junit.Test;
import org.springframework.context.ApplicationContext;

import static org.junit.Assert.*;

import com.justcloud.osgifier.dto.SpringContext;
import com.justcloud.osgifier.service.SpringService;
import com.justcloud.osgifier.service.UserService;
import com.justcloud.osgifier.service.impl.SpringServiceImpl;

public class SpringTest {

	private SpringService springService = new SpringServiceImpl();
	private SpringContextHolder holder = SpringContextHolder.getInstance();
	
	@Test
	public void testLoad() throws Exception {
		SpringContext context = new SpringContext();
		context.setName("test");
		context.setDescription("Happy description");
		context.setContent(loadResource("/spring.xml"));
		springService.registerContext(context);
		
		ApplicationContext ctx = holder.getContext("test");
		
		assertNotNull(ctx.getBean(UserService.class));
	}
	
	@Test
	public void testDestroy() throws Exception {
		SpringContext context = new SpringContext();
		context.setName("test1");
		context.setDescription("Happy description");
		context.setContent(loadResource("/spring.xml"));
		springService.registerContext(context);
		
		ApplicationContext ctx = holder.getContext("test1");
		assertNotNull(ctx);
		springService.destroyContext("test1");
		ctx = holder.getContext("test1");
		assertNull(ctx);
	}
	
	private String loadResource(String path) throws Exception {
		BufferedReader is = new BufferedReader(new InputStreamReader(getClass()
				.getResourceAsStream(path)));
		StringBuffer buffer = new StringBuffer();
		String line;
		try {
			while ((line = is.readLine()) != null) {
				buffer.append(line);
				buffer.append("\n");
			}
		} finally {
			if (is != null) {
				is.close();
			}
		}
		return buffer.toString();
	}
	
}
