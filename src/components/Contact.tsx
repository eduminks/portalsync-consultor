import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { PaperPlaneTilt, Envelope, User, Buildings, Globe } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card } from '@/components/ui/card'
import { AnimatedSection } from './AnimatedSection'
import { WorldMap } from './WorldMap'
import { toast } from 'sonner'
import { useKV } from '@github/spark/hooks'
import { motion } from 'framer-motion'

const formSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  company: z.string().optional(),
  service: z.string().min(1, 'Selecione um serviço'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
})

type FormData = z.infer<typeof formSchema>

interface ContactSubmission extends FormData {
  id: string
  timestamp: string
}

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissions, setSubmissions] = useKV<ContactSubmission[]>('contact-submissions', [])

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      service: '',
      message: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const submission: ContactSubmission = {
        ...data,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
      }
      
      setSubmissions((current) => [...(current || []), submission])
      
      toast.success('Mensagem enviada com sucesso!', {
        description: 'Entraremos em contato em breve.',
      })
      
      form.reset()
    } catch (error) {
      toast.error('Erro ao enviar mensagem', {
        description: 'Por favor, tente novamente.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden">
      <WorldMap />
      
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background/95 to-accent/5" />
      
      <motion.div
        className="absolute top-10 right-10 w-72 h-72 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            <Envelope className="text-accent" weight="duotone" size={16} />
            <span className="text-xs font-mono uppercase tracking-wider text-accent">
              Entre em Contato
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Vamos Conversar?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Estamos prontos para ajudar sua empresa a alcançar novos patamares.
            Entre em contato e vamos construir o futuro juntos.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <AnimatedSection delay={0.1} className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/20">
                  <Globe size={32} weight="duotone" className="text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Integrações Globais</h3>
                  <p className="text-muted-foreground">
                    Conectamos sistemas e plataformas ao redor do mundo, criando soluções integradas
                    que impulsionam seu negócio.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-xl bg-gradient-to-br from-card to-card/50 border border-border backdrop-blur-sm"
                >
                  <div className="text-3xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent mb-2">
                    100+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Projetos Entregues
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-xl bg-gradient-to-br from-card to-card/50 border border-border backdrop-blur-sm"
                >
                  <div className="text-3xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent mb-2">
                    50+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Clientes Satisfeitos
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-xl bg-gradient-to-br from-card to-card/50 border border-border backdrop-blur-sm"
                >
                  <div className="text-3xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent mb-2">
                    24/7
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Suporte Técnico
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-xl bg-gradient-to-br from-card to-card/50 border border-border backdrop-blur-sm"
                >
                  <div className="text-3xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent mb-2">
                    10+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Anos de Experiência
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="p-6 rounded-xl bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20 backdrop-blur-sm"
              >
                <p className="text-sm text-muted-foreground italic">
                  "A PortalSync transformou completamente nossa operação. As integrações desenvolvidas
                  aumentaram nossa eficiência em 300% e reduziram erros para praticamente zero."
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent" />
                  <div>
                    <div className="font-semibold text-sm">João Silva</div>
                    <div className="text-xs text-muted-foreground">CEO, TechCorp</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 lg:p-10 border-2 shadow-2xl backdrop-blur-sm bg-card/95">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <User size={18} weight="duotone" />
                            Nome Completo *
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="contact-name"
                              placeholder="Seu nome"
                              {...field}
                              className="h-12"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Envelope size={18} weight="duotone" />
                            Email *
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="contact-email"
                              type="email"
                              placeholder="seu@email.com"
                              {...field}
                              className="h-12"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Buildings size={18} weight="duotone" />
                            Empresa
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="contact-company"
                              placeholder="Nome da sua empresa"
                              {...field}
                              className="h-12"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Serviço de Interesse *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger id="contact-service" className="h-12">
                                <SelectValue placeholder="Selecione um serviço" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="desenvolvimento">Desenvolvimento de Software</SelectItem>
                              <SelectItem value="erp">Consultoria em ERPs</SelectItem>
                              <SelectItem value="integracoes">Integrações de Sistemas</SelectItem>
                              <SelectItem value="automacao">Automação Comercial</SelectItem>
                              <SelectItem value="outro">Outro</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensagem *</FormLabel>
                          <FormControl>
                            <Textarea
                              id="contact-message"
                              placeholder="Conte-nos sobre seu projeto..."
                              className="min-h-[100px] resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full h-14 text-lg bg-gradient-to-r from-primary to-accent hover:shadow-xl hover:shadow-primary/30 transition-all relative overflow-hidden group"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-accent to-primary"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.5 }}
                          style={{ opacity: 0.3 }}
                        />
                        {isSubmitting ? (
                          <span className="relative">Enviando...</span>
                        ) : (
                          <span className="relative flex items-center justify-center gap-2">
                            <PaperPlaneTilt size={20} weight="duotone" />
                            Enviar Mensagem
                          </span>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </Card>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
