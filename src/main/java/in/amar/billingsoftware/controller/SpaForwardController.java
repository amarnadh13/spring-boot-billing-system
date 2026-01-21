import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaForwardController {

    @GetMapping(value = {
            "/dashboard",
            "/login",
            "/register",
            "/items",
            "/categories"
    })
    public String forward() {
        return "forward:/index.html";
    }
}
