package com.julienlim.portfolio.contact;

public class DailyLimitReachedException extends RuntimeException {

    public DailyLimitReachedException() {
        super("Plafond quotidien de messages atteint");
    }
}
