use luhn2::validate;
use std::env;
use std::fs::File;
use std::io::{BufRead, BufReader, Write};

fn main() {
    let args: Vec<String> = env::args().collect();
    let input_file_arg = &args[1];
    let output_file_arg = &args[2];

    let input_file = File::open(input_file_arg).expect("Cannot open the input file!");
    let cards = BufReader::new(input_file);

    let results: Vec<String> = cards
        .lines()
        .filter_map(|result| result.ok())
        .map(|card| {
            let validity = match validate(card.parse::<u64>().unwrap()) {
                false => "invalid",
                true => "valid",
            };

            format!("MasterCard: {} ({})", card, validity)
        })
        .collect();

    let mut output = File::create(output_file_arg).expect("Cannot create output file!");
    write!(output, "{}\n", results.join("\n"));
}
