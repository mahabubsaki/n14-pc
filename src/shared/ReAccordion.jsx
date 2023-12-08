import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export function ReAccordion({ infos }) {
    return (
        <Accordion type="single" collapsible className="w-full">
            {infos.map((i, index) => <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{i.title}</AccordionTrigger>
                <AccordionContent>
                    {i.description}
                </AccordionContent>
            </AccordionItem>)}

        </Accordion>
    );
}
